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