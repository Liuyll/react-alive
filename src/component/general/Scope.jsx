import React,{ useReducer,useLayoutEffect,useRef,Suspense,useCallback,useState } from 'react'
import produce,{ setAutoFreeze } from 'immer'
import Context from './Context'
const shallowEqual = require('shallowequal')

setAutoFreeze(false)
export default function Scope({ children }) {
    const nodeRefs = useRef({})
    const [node_store,dispatch] = useReducer(reducer,{})
    const resolveRef = useRef({})
    const registeredRef = useRef({}) 
    const [contextBridge,addContext] = useState([])

    const registerProvider = useCallback((context,value) => {
        addContext(produce((_,draft) => { draft.push([context,value]) }))
        return context.Provider
    },[])

    function reducer(state,action) {
        switch(action.type){
        case 'add': 
            return produce(state,(draft) => {
                draft[action.id] = action.children
            })

        case 'replace': 
            return produce(state,(draft) => {
                draft[action.id] = action.children
            })
        }
    }

    useLayoutEffect(() => {
        const shouldYield = Object.keys(nodeRefs.current)
        const needResolve = Object.keys(resolveRef.current)

        if(shouldYield && needResolve) {
            const resolveId = Object.keys(resolveRef.current)
            let node 
            resolveId.forEach((id) => {
                node = registeredRef.current[id].pending = nodeRefs.current[id]
                resolveRef.current[id].resolve(node)
            })

            resolveRef.current = {}
        } 
    })

    const keep = useCallback((id,children,props) => {
        let type

        if(registeredRef.current[id]?.pending) {
            if(shallowEqual(props,registeredRef.current[id].props)) {
                return registeredRef.current[id].pending
            }
            type = 'replace'
        }

        type = type ?? 'add'
        
        const pending = new Promise(resolve => {
            resolveRef.current[id] = {
                id,
                resolve
            }

            dispatch({
                type,
                id,
                children
            })
        })

        registeredRef.current[id] = {
            props,
            pending
        }

        return registeredRef.current[id].pending
    },[])

    const get = useCallback((id) => node_store[id],[])
    return (
        <div>
            <Context.Provider value={{ keep,get }}>
                <Suspense fallback={<div>loading</div>}>
                    {children}
                </Suspense>
            </Context.Provider>
            <div id="store">
                {Object.keys(node_store).map((id) => (
                    <div 
                        ref={x => {
                            nodeRefs.current[id] = x
                        }}
                        key={id}
                    >
                        {node_store[id]}
                    </div>
                ))}
            </div>
        </div>
    )
}
