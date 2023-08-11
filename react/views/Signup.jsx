import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../src/axios-client.jsx";
import {useStateContext} from "../src/contexts/ContextProvider.jsx";

const Signup = () =>{
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const [errors,setError] = useState(null)
    const {setUser,setToken} = useStateContext()
    const onSubmit = (ev)=>{
        ev.preventDefault()
        const payload = {
            name:nameRef.current.value,
            email: emailRef.current.value,
            password:passwordRef.current.value,
            password_confirmation:passwordConfirmationRef.current.value
        }
        axiosClient.post("/signup",payload)
            .then(({data})=>{
                setToken(data.token)
                setUser(data.user)
            })
            .catch(err=>{
                const response = err.response
                if (response && response.status===422){
                    setError(response.data.errors)
                }
                if (response && response.status===500){
                    console.log(response.data.errors)
                }
            })
    }
    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for free</h1>
                    {errors && <div className="alert">
                        {Object.keys(errors).map(key=>(
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div> }
                    <input ref={nameRef} type="text" placeholder="Full Name"/>
                    <input ref={emailRef} type="email" placeholder="Email Address"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
                    <button className="btn btn-block">Signup</button>
                    <p className="message">
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
export default Signup
