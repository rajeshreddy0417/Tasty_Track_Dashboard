import React,{useState} from 'react'
import {API_URL} from "../../data/apiPath"

const Register = ({showLoginHandler}) => {
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setpassword]=useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(true)

  const handleSubmit =async(e)=>{
    e.preventDefault();

    try {
      const response=await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({username,email,password})
      })

      const data = await response.json()
      if(response.ok){
        console.log(data);
        setUsername("");
        setEmail("");
        setpassword("");
        alert( "Vender registered successfully");
        showLoginHandler();
      }
    } catch (error) {
      console.error("registration failed",error);
      alert("Registration failed");
    }
  }

  return (
    <div className="registerSection">
        <form className='authForm' onSubmit={handleSubmit}>
            <h3>Register Login</h3>
                <label>Username</label>
                <input type='text' name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter name'/><br/>
                <label>Email</label>
                <input type='text' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter E mail'/><br/>
                <label>Password</label>
                <input type='password' name='password' value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter password'/><br/>
                <div className="btnSubmit">
                    <button type='submit'>Submit</button>
                </div><br/>
        </form>
    </div>
  )
}

export default Register
