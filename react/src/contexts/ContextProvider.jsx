import {createContext, useContext, useState} from "react";
const StateContext = createContext({
    user: "John",
    token: null,
    setUser:()=>{},
    setToken:()=>{},
    setNotification: () => {}
})
export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"))
    const [notification, _setNotification] = useState('')
    // const [token, _setToken] = useState()
    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token)
        } else {
            localStorage.removeItem("ACCESS_TOKEN")
        }
    }
    const setNotification = message => {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }
    return (
        <div>
            <StateContext.Provider value={{
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification
            }}>
                {children}
            </StateContext.Provider>
        </div>
    )
}
export const useStateContext = () => useContext(StateContext)
