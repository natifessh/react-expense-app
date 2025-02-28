import { useEffect, useState } from "react";
import { api, setAuthToken } from "../api";
import styleClasses from "../styles/style.module.css"

const WhoIsSpenDingMore=()=>{
    const[users,setUsers]=useState([])
    const username=localStorage.getItem("username")
    useEffect(()=>{
     const token=localStorage.getItem("token")
     if(token){
        setAuthToken(token)
     }
     const handleFetchUsers=async()=>{
        try{
            const response= await api.get("/expenses/rank")
            setUsers(response.data)

        }catch(err){
            console.log(err)
        }
     }
     handleFetchUsers()
    },[])
    return(
       <div className={styleClasses.usersList}>
       <h2>who is spending more? spend more to rank up </h2>
       <hr></hr>
      
       <ul>
                 
                  
                 {users.map((user,idx) => (
                   <li key={idx} >
                     <p>#{idx+1} {user.username==username?"You":user.username}</p>
                     <p>{user.username==username?`You spent \$${user.total_spent}`:`spent \$${user.total_spent}`}.00</p>
                    
                    
                   
                   </li>
                 ))}
               </ul>

       </div>
    
    )
}
export default WhoIsSpenDingMore;