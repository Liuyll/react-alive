import { createContext,useContext } from 'react'

const Context = createContext({})
export default Context

export const AliveContextProvider = ({ context }) => {
    const { registerContext } = useContext(Context).value
}