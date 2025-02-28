import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import { api,setAuthToken } from "../api"
import styleClasses from '../styles/style.module.css'

const Login=({setIsLoggedIn})=>{
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const[error,setError]=useState(null)
    const navigate=useNavigate()
    const handleLogin=async(e)=>{
        e.preventDefault()
        try{
            const response=await api.post("/auth/login",{
                username,
                password
            })
            console.log(response)
            const {token}=response.data;
            localStorage.setItem("token",token)
            localStorage.setItem("username",username)
            setAuthToken(token)
            setIsLoggedIn(true)
            localStorage.setItem("isLoggedIn",JSON.stringify(true))
            navigate("/DashBoard")
        }catch(err){
            console.log(err)
            setError("Please make sure you've entered correct username and password")
        }
    }
    return(
        <div className={styleClasses.formContainer}>
            <h2>Login</h2>
            {error && <p className={styleClasses.error}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                ></input>
             
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                
                ></input>
                <button type="submit">Login</button>
            </form>


        </div>
    )
}
export default Login;