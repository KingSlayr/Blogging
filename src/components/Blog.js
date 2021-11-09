import React, { useEffect, useState } from 'react'
import '../assets/Blog.css'
import UserCard from './UserCard'
import Comments from './Comments'
import { Link } from 'react-router-dom'
import { doc, getDoc} from "firebase/firestore";
import {db} from '../firebase'

function Blog() {
    const [ourBlog, setOurBlog] = useState({})
    // const [ourBlogAuthor, setOurBlogAuthor] = useState({})

    useEffect(() => {
        var blogId = window.location.pathname.substr(6,window.location.pathname.length-6)
        const blogRef = doc(db, "blogs", blogId);
        getDoc(blogRef).then(blog=>{
            setOurBlog(blog.data())

        }).then(()=>{
            document.querySelector('.blog_content')?.childNodes.forEach(element => {
                if(element.style){
                    // console.log(element.style);
                    element.style.width = '100%'
                    element.style.wordBreak = 'break-word'
                }
            });
        });
    }, [])

    // useEffect(() => {
    //     const blogAuthorRef = doc(db, "users", ourBlog.author);
    //     getDoc(blogAuthorRef).then(blog=>{
    //         setOurBlogAuthor(blog.data())
    //     });
    // }, [])

    const likeBlog = () =>{
        // var blogId = window.location.pathname.substr(6,window.location.pathname.length-6)
        // const blogRef = doc(db, "blogs", blogId);
        // getDoc(blogRef).then(blog=>{
        //     updateDoc(blogRef, {
        //         likes:(blog.data().likes?blog.data().likes+1:1)
        //     }).then((doc)=>{
        //         document.querySelector('.notLiked').style.display = 'none'
        //         document.querySelector('.Liked').style.display = 'block'
        //         setOurBlog({likes:(blog.data().likes?blog.data().likes+1:1)})
        //         console.log(ourBlog);
        //     }).catch((error)=>{
        //         console.log(error);
        //     });;
        // });
    }
    const dislikeBlog = () =>{
        // var blogId = window.location.pathname.substr(6,window.location.pathname.length-6)
        // const blogRef = doc(db, "blogs", blogId);
        // getDoc(blogRef).then(blog=>{
        //     updateDoc(blogRef, {
        //         likes:(blog.data().likes?blog.data().likes-1:1)
        //     }).then((doc)=>{
        //         document.querySelector('.notLiked').style.display = 'block'
        //         document.querySelector('.Liked').style.display = 'none'
        //         setOurBlog({likes:(blog.data().likes?blog.data().likes-1:1)})
        //         console.log(ourBlog);
        //     }).catch((error)=>{
        //         console.log(error);
        //     });;
        // });
    }

    return (
        <div className='blog'>
            <div className='blog_left'>
                <Link style={{'textDecoration':'none','color':'black'}} to='/user'><UserCard/></Link>
                <Comments/>
            </div>
            <div className="blog_middle">
                <div className="blog_title">
                    {ourBlog?.title}
                </div>
                <div className='blog_tags'>
                    <div>blog</div>
                    <div>definition</div>
                    <div>info</div>
                    <div>tech</div>
                </div>
                <div className="blog_content"  dangerouslySetInnerHTML={{__html: ourBlog?.content}}>
                    {/* {ourBlog.content} */}
                </div>
            </div>
            <div className="blog_right">
                <i class="far fa-thumbs-up notLiked" onClick={()=>likeBlog()}>{ourBlog.likes}</i>
                <i class="fas fa-thumbs-up Liked" onClick={()=>dislikeBlog()}>{ourBlog.likes}</i>
                <i class="far fa-heart"></i>
                {/* <i class="fas fa-heart"></i>  filled */}
                <i class="far fa-comment"></i>
            </div>
        </div>
    )
}

export default Blog
