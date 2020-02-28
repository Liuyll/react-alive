import React,{ useRef,useLayoutEffect,useCallback,useMemo,useContext,memo } from 'react'
import Context from './Context'

const withScope = (WrapAliveComponent) => (props) => {
    const { keep } = useContext(Context)
    
    return (
        <div>
            <WrapAliveComponent {...props} keep={keep} />
        </div>
    )
}


const KeepAlive = memo((props) => {
    const { children,id,keep } = props
    const ref = useRef()
    const _register = useCallback(() =>  keep(id,children,props),[children,props])
    const storeNodeRef = useMemo(() => {
        
        const registerResult = _register()
        if(registerResult instanceof Promise) {
            throw registerResult
        }
        return registerResult
    },[props])


    useLayoutEffect(() => {
        ref.current.appendChild(storeNodeRef)
    })

    return (
        <div id="keep" ref= { rel => ref.current = rel}></div>
    )
})

export default withScope(KeepAlive)

