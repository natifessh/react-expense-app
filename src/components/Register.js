import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../api"
import styleClasses from "../styles/style.module.css"
const Register=({setIsRegistered})=>{
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const[error,setError]=useState(null)
    const navigate=useNavigate()
    const handleUserRegister=async(e)=>{
        e.preventDefault()
        try{
            const response=await api.post("/auth/register",{
                username,
                password
            })
            console.log(response)
            setIsRegistered(true);
            localStorage.setItem("isRegistered",JSON.stringify(true))
           navigate("/Login")
        }catch(err){
            setError("Username might be taken already,please use different username and try again")
        }
    }
    return(
        <div className={styleClasses.formContainer}>
            <h2>Register</h2>
            {error && <p className={styleClasses.error}>{error}</p>}
            <form onSubmit={handleUserRegister}>
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
                <button type="submit">Sign up </button>
            </form>


        </div>
    )
}
export default Register