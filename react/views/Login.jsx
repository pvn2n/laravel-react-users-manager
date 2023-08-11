import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../src/contexts/ContextProvider.jsx";
import axiosClient from "../src/axios-client.jsx";

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [errors, setError] = useState(null)
    const {setUser, setToken} = useStateContext()

    const onSubmit = (ev) => {
        ev.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,

        }

        axiosClient.post("/login", payload)
            .then(({data}) => {
                setToken(data.token)
                setUser(data.user)
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setError(response.data.errors)
                }
                if (response && response.status === 401) {
                    setError(response.data)
                }

            })
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Login into your account</h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key]}</p>
                        ))}
                    </div>}
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
