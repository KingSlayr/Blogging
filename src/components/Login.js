import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom'
import '../assets/Login.css'


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const submitClicked = () => {
        // console.log(email,password);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.localStorage.setItem('user',JSON.stringify(user))
            // console.log(JSON.stringify(user));
            window.location = `./user/${user.uid}`
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
        setEmail('')
        setPassword('')
    }

    return (
        <div className='login'>
            <div className="form">
                <div className='head'>
                    <span>Login</span>
                </div>
                <div className='inputs'>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name='email' 
                        placeholder='Enter Your Email ...' 
                        onInput={(e)=>setEmail(e.target.value)}
                        value={email}/>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name='password' 
                        placeholder='Enter Your Password ...' 
                        onInput={(e)=>setPassword(e.target.value)}
                        value={password} />
                    <button onClick={()=>submitClicked()}>Log in</button>
                    <Link style={{'textDecoration':'none','color':'black','textAlign': 'center'}} to='/register'><span>Register?</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Login
