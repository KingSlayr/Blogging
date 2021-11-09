import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom'
import '../assets/Register.css'


function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const submitClicked = () => {
        // console.log(name,email,password);
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.localStorage.setItem('user',JSON.stringify(user))
            // console.log(JSON.stringify(user));
            window.location = './home'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorMessage,errorCode);
            alert(errorMessage)
        });
        setName('')
        setEmail('')
        setPassword('')
    }
    
    return (
        <div className='login'>
            <div className="form">
                <div className='head registerHead'>
                    <span>Register</span>
                </div>
                <div className='inputs registerInput'>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name='name' 
                        placeholder='Enter Your Name ...' 
                        onInput={(e)=>setName(e.target.value)}
                        value={name} />

                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name='email' 
                        placeholder='Enter Your Email ...' 
                        onInput={(e)=>setEmail(e.target.value)}
                        value={email} />

                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name='password' 
                        placeholder='Enter Your Password ...' 
                        onInput={(e)=>setPassword(e.target.value)}
                        value={password} />

                    <button onClick={()=>submitClicked()}>Register</button>
                    <Link style={{'textDecoration':'none','color':'black','textAlign': 'center'}} to='/login'><span>Login?</span></Link>
                </div>
            </div>
        </div>
    )
}

export default Register
