import React,{ useState } from 'react'
import Add from './component/Add'
import KeepScope from './component/general/Scope'

if(module.hot){
    module.hot.accept('./')
}

const App = function(){
    return (
        <KeepScope>
            <Show/>
        </KeepScope>
    )
}

const Show = () => {
    const [toggle,setToggle] = useState(true)

    return (
        <div>  
            <button onClick={() => setToggle(toggle => !toggle)}>toggle</button>
            {
                toggle && <Add />
            }
            {
                !toggle && <div>wait toggle</div>
            }
        </div>
    )
}
export default App