import React,{useState} from 'react'
import {API_URL} from "../../data/apiPath"

const Login = ({ShowWelcomeHandler}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const loginHandler=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
      })
      const data=await response.json();
      if(response.ok){
        alert('Login successfull');
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken',data.token);
        ShowWelcomeHandler();
      }
      const vendorId = data.vendorId
      console.log("checking for VendorId:",vendorId)
      const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      const vendorData=await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId=vendorData.vendorFirmId;
        const vendorFirmName=vendorData.vendor.firm[0].firmname;
        console.log("my firm name is ",vendorFirmName);
        //console.log("chacking for firmId",vendorFirmId);
        localStorage.setItem('firmid',vendorFirmId);
        localStorage.setItem('firmName',vendorFirmName);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("login fail");
    }
  }


  return (
    <div className="loginSection">
        
        <form className='authForm' onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type='text' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter E-mail'/><br/>
            <label>Password</label>
            <input type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'/><br/>
            <div className="btnSubmit">
                <button type='submit' >Submit</button>
            </div><br/>
        </form>
    </div>
  )
}

export default Login
