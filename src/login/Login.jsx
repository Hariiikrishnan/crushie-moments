import React,{useState,useContext} from "react";
import axios from 'axios';
import { LoginSharp } from "@mui/icons-material";
import Cookies from 'universal-cookie';
// import { Button } from "rsuite";
// // Default CSS
// import "rsuite/dist/rsuite.min.css";

import {AuthContext} from "./Auth.jsx"
import {LoginContext} from "./LoginAuth.jsx"
import {RegisterContext} from "./RegisterAuth.jsx"


// const cookies = new Cookies();

function Login(){

    const [authState,setAuthState] = useContext(AuthContext);
    const [isLoggedIn,setLoggedIn] = useContext(LoginContext);
    const [isRegistered,setRegisterState] = useContext(RegisterContext);
    const [startLoading,setLoading]=useState(false);

    const [loginAccount,setLoginAccount]=useState({
        username:"",
        password:"",
    });

    function handleChange(event){
        const {name,value}=event.target;
        // console.log(event.target);
        
        // console.log(loginAccount)
        setLoginAccount((prevNotes)=>{
            // console.log(prevNotes);
            return {...prevNotes,[name]:value};
          });
        
    }
    function handleLogin(event){
        
        // let user = JSON.parse(sessionStorage.getItem('data'));
        // const token = req.header('Authorization').replace('Bearer ', '')
        // const token = user.data.id;
        // console.log(token);
        // console.log(user)
        setLoading(true);      
        event.preventDefault();

       
        // console.log(loginAccount)
        const config ={
            headers : {
                // "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        };
        try{
            const body = JSON.stringify(loginAccount);
            axios.post("/login",body,config).then((res)=>{
                setLoggedIn(true)
                setAuthState(res.data.token);
                // console.log(authState);
                console.log(res.data.token);
                console.log(res.data.users)
            })
            //  window.location.reload();
            // console.log(JSON)
            console.log("Login Data Sent!!")
        }catch (err){
            console.error("error ",err.res.data)
            // console.log("error")
        }
        // setLoading(false);   
    }
    
    
   console.log(startLoading);
  

    //  console.log("Outside Token " + authState)
   return <div class="login">
        <form class="create-form">
            <h2 class="below-box">Hii, Had a good Day?</h2>
            <div class="loginInput">
            {/* <label>Enter Username</label> */}
            <input type="text" name="username" onChange={handleChange} placeholder="Username" autoComplete="off"/>
            {/* <label>Enter Password</label> */}
            <input type="password " name="password" onChange={handleChange} placeholder="Password" autoComplete="off"/>
            </div>
            <div class="below-box">
            <button type="submit" loading onClick={handleLogin}> { startLoading ? <i class="fa fa-circle-o-notch fa-spin" style={{fontSize:"24px",padding:"5%"}}></i> : "Submit" }</button>
            <br></br>
            {/* <p>Already have an Account?</p> */}
            <a href="/" class="forgotPassword">Forgot Password?</a>

            <p>Don't have an Account?</p>
            <a href="/" onClick={(e)=>{
                e.preventDefault();
                setRegisterState(true);
            }}>Register now!</a>
            </div>
        </form>
   </div>
}

export default Login;