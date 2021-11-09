import React, { useEffect, useState }  from 'react'
import '../assets/User.css'
// import BlogCard from './BlogCard'
import userImage from '../data/user.png'
// import { Link } from 'react-router-dom'
// import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {db} from '../firebase'

function User() {

    if(window.localStorage.getItem('user')===null){
        window.location = '../login'
    }

    const [user, setUser] = useState({})
    const [myBlogs, setMyBlogs] = useState({})
    const [likedBlogs, setLikedBlogs] = useState({})

    useEffect(() => {
        var userId = window.location.pathname.substr(6,window.location.pathname.length)
        const userRef = doc(db, "users", userId);
        getDoc(userRef).then(user=>{
            setUser(user.data())
        });
    }, [])

    // myBlogs
    // useEffect(() => {
    //     var blogId = window.location.pathname.substr(6,window.location.pathname.length-6)
    //     const blogRef = doc(db, "blogs", blogId);
    //     getDoc(blogRef).then(blog=>{
    //         setOurBlog(blog.data())
    //     });
    // }, [])

    // LikedBlogs
    // useEffect(() => {
    //     var blogId = window.location.pathname.substr(6,window.location.pathname.length-6)
    //     const blogRef = doc(db, "blogs", blogId);
    //     getDoc(blogRef).then(blog=>{
    //         setOurBlog(blog.data())
    //     });
    // }, [])

    return (
        <div className='user'>
            <div className='user_left'>
                <img className='user_image' src={userImage}/>
                <div>{user?.name}</div>
                <div>                
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
            </div>
            <div className='user_middle'>
                <span>My Blogs - </span>
                {/* <Link style={{'textDecoration':'none','color':'black'}} to='/blog'><BlogCard/></Link>           
                <Link style={{'textDecoration':'none','color':'black'}} to='/blog'><BlogCard/></Link>           
                <Link style={{'textDecoration':'none','color':'black'}} to='/blog'><BlogCard/></Link>           
                <Link style={{'textDecoration':'none','color':'black'}} to='/blog'><BlogCard/></Link>  */}
            </div>
            <div className='user_right'>
                <span>Liked - </span>
                {/* <Link style={{'textDecoration':'none','color':'black'}} to='/blog'><div>What is a Blog? – Definition of Terms Blog, Blogging, and Blogger</div></Link> 
                <Link style={{'textDecoration':'none','color':'black'}} to='/blog'><div>What is a Blog? – Definition of Terms Blog, Blogging, and Blogger</div></Link> 
                <Link style={{'textDecoration':'none','color':'black'}} to='/blog'><div>What is a Blog? – Definition of Terms Blog, Blogging, and Blogger</div></Link>  */}
            </div>
        </div>
    )
}

export default User
