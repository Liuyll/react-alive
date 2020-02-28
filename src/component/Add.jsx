import React,{ useState } from 'react'
import KeepAlive from './general/Alive'

const Test = () => {

    const [count,setCount] = useState(0)
    return (
        <div>
            <button onClick={() => setCount((count) => count + 1)}>{count}</button>
        </div>
    )
}

export default () => {
    return (
        <KeepAlive id="test">
            <Test />
        </KeepAlive>
    )
}

export const Other = (props) => {
    return (
        <KeepAlive id="test1" {...props}>
            <Test />
            <div>{props.name}</div>
        </KeepAlive>
    )
}