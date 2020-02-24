import React,{ useRef,useEffect } from 'react'
import Context from './Context'

const withScope = (WrapAliveComponent) => (props) => (
    <Context.Consumer>
        {({ keep,get }) => <WrapAliveComponent {...props} keep={keep} get={get}/>}
    </Context.Consumer>
)

const KeepAlive = (props) => {
    const { children,id,keep } = props
    const ref = useRef()

    useEffect(() => {
        keep(id,children).then((node) => {
            ref.current.appendChild(node)
        })
    },[])
    

    return (
        <div id="keep" ref= { rel => ref.current = rel}></div>
    )
}

export default withScope(KeepAlive)

