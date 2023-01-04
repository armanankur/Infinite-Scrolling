 import React from 'react';
 import {useState} from 'react'
 import {useNavigate} from 'react-router-dom';
 import "./Login.css"
 import {FaUser} from "react-icons/fa"
 import {FaLock} from "react-icons/fa"
 

const Login =()=>{
    const navigate = useNavigate();
    const[value,setValue]= useState({
       username: "",
       password: "",
    })

    const handleChange=(e)=>{
        setValue({
            ...value, [e.target.name] : e.target.value
        })
    }

    const handleSubmit=(event)=>{
        if(value.username === "foo" && value.password === "bar"){
            navigate('/home');
        }else{
            alert("invalid credentials")
        }

    }
    return(
        <div id="container">
         <form onSubmit={handleSubmit}>
               <h1>CONTACT  VIEWER</h1>
               
            <div className='input_box'>
            <label htmlFor="username" > <FaUser/></label>
            <input type="text" name="username" placeholder=" Username "
                value={value.name} onChange={handleChange} />
            </div> <br/>
            
            <div className='input_box'>
            <label htmlFor="password" > <FaLock/></label>
            <input type="password" name="password" placeholder="Password "
                value={value.password} onChange={handleChange} />
            </div> <br/>

            <button type="submit"  onClick={handleSubmit} >Login</button>
         </form>
        </div>
    )
}
export default Login