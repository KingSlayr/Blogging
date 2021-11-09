import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/Navbar.css'
import user from '../data/user.png'

function Navbar() {
    const [isLoggedin, setIsLoggedin] = useState(false)
    useEffect(() => {
        if(window.localStorage.getItem('user')!==null){
            setIsLoggedin(true)
        }
    }, [])
    return (
        <div className='navbar'>
            <Link style={{'textDecoration':'none','color':'black'}} to='/home'>
                <div className="navbar_left">Blog</div> 
            </Link>           
            <div className="navbar_right">
                <i class="far fa-bell"></i>
                <Link style={{'textDecoration':'none','color':'black'}} to='/createblog'>
                    <i class="far fa-plus-square"></i> 
                </Link>    
                {isLoggedin
                ?<Link style={{'textDecoration':'none'}} to={`/user/${JSON.parse(window.localStorage.getItem('user'))?.uid}`}>
                    <img className='navbar_image' src={user}/>
                </Link>

                :<Link style={{'textDecoration':'none'}} to='/login'>
                    <i class="fas fa-sign-in-alt"></i>  
                </Link>
                }
            </div>            
        </div>
    )
}

export default Navbar
