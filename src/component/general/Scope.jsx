import React,{ useReducer,useLayoutEffect,useRef,isValidElement } from 'react'
import produce from 'immer'
import Context from './Context'

export default function Scope({ children }) {
    const nodeRefs = useRef({})
    const [node_store,dispatch] = useReducer(reducer,{})
    const resolveRef = useRef()

    function reducer(state,action) {
        switch(action.type){
        case 'add': {
            // const newState = produce(state,(draft) => {
            //     draft[action.id] = action.children
            // })

            // return newState
        
            return {
                ...state,
                [action.id]: action.children
            }   
        }
        }
    }

    useLayoutEffect(() => {
        // console.log(Object.keys(node_store),resolveRef.current)
        if(resolveRef.current) {
            const node = nodeRefs.current[resolveRef.current.id]
            resolveRef.current.resolve(node)
            resolveRef.current = null
        }
    })

    const keep = (id,children) => new Promise(resolve => {
        resolveRef.current = {
            id,
            resolve
        }
        dispatch({
            type: 'add',
            id,
            children
        })}
    )

    const get = (id) => node_store(id)

    return (
        <div>
            <Context.Provider value={{ keep,get }}>
                {children}
            </Context.Provider>
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
            {/* {Object.keys(node_store).map((id) => (
                isValidElement(node_store[id]) && node_store[id]
            ))} */}
        </div>
    )
}
