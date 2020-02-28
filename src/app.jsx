import React,{ useState,useRef,useEffect,useLayoutEffect,Suspense } from 'react'
import Add,{ Other } from './component/Add'
import KeepScope from './component/general/Scope'

if(module.hot){
    module.hot.accept('./')
}

const App = function(){
    const [name,set] = useState("liuyl")
    return (
        <KeepScope>
            <div>
                <button onClick={() => set('wd')}>set</button>
            </div>
            {/* <Show/> */}
            <OtherC name={name}/>
        </KeepScope>
        // <Test/>
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

const OtherC = ({ name }) => {
    const [otherToggle,setOtherToggle] = useState(true)
    return (
        <div>
            <button onClick={() => setOtherToggle(toggle => !toggle)}>toggle other</button>
            {otherToggle && <Other name={name}/>}
        </div>
    )
}

// const Test = () => {
//     const ref = useRef()

//     useEffect(() => {
//         console.log(ref.current)
//     })
//     useLayoutEffect(() => {
//         console.log(ref.current)
//     })

//     return (
//         <div ref={el => {
//             ref.current = el
//             console.log('mount ref')
//         }}></div>
//     )
// }

export default App