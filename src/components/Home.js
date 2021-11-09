import React, { useEffect, useState } from 'react'
import '../assets/Home.css'
import UserCard from './UserCard'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom'
import {  collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";
import {db} from '../firebase'

function Home() {
    const [blogs, setBlogs] = useState([])
    const [users, setUsers] = useState([])
    const [lastVisible, setLastVisible] = useState({})

    useEffect(() => {
        // Query the first page of docs
        const first = query(collection(db, "blogs"), orderBy("timestamp","desc"), limit(5));
        getDocs(first).then(doc=>{
            // console.log(doc.docs);
            setBlogs([doc.docs])
            setLastVisible(doc.docs[doc.docs.length-1]);
            // console.log('fetch');
        })
    },[])

    

    for(var i=0; i<blogs?.[0]?.length; i++){
        // blogs?.[0][i].data().id = blogs?.[0][i].id
        var blog = blogs?.[0][i].data();
        blog.id = blogs?.[0][i].id
        // console.log('d');
        try {
            window.sessionStorage.setItem(`blog${i}`,JSON.stringify(blog))
        } catch (e) {
            // console.log(e);
        }
    }

    var ourBlogs = [];
    var x = 0;
    for (var i = 0; i < window.sessionStorage.length; i++){
        if(window.sessionStorage.key(i).includes('blog')){
            ourBlogs.push(JSON.parse(window.sessionStorage.getItem('blog'+(x))))
            x++;
        }
    }

    document.querySelector('.home_middle')?.scroll(0,window.sessionStorage.getItem('scrollHeight'))

    const onScroll = (event) =>{
        window.sessionStorage.setItem('scrollHeight',document.querySelector('.home_middle')?.scrollTop);
        if (Math.abs(event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight) <= 3.0) {  
            // console.log('scrolled to bottom')  
            const next = query(collection(db, "blogs"),
                                orderBy("timestamp","desc"),
                                startAfter(lastVisible),
                                limit(20));
            getDocs(next).then(doc=>{
                var blogsArray = blogs[0]?.concat(doc.docs);
                setBlogs([blogsArray])
                setLastVisible(doc.docs[doc.docs.length-1]);
                // console.log('fetch');
            })
        } 
    }

    useEffect(() => {
        getDocs(collection(db, "users")).then(doc=>{
            setUsers([doc.docs])
        });
    },[])

    return (
        <div className='home'>
            <div className="home_left">     
                {
                    users[0]?.map((user)=>(
                        <Link id={user.id} style={{'textDecoration':'none','color':'black'}} to={`/user/${user.id}`}><UserCard currentuser={user.data()}/></Link> 
                    ))
                }      
            </div>
            <div className="home_middle" onScroll={(event)=>onScroll(event)}>
            {
                ourBlogs?.map((blog)=>(
                <Link id={blog.id} style={{'textDecoration':'none','color':'black'}} to={`/blog/${blog.id}`}><BlogCard currentblog={blog}/></Link>
                ))
            }
            </div>
            <div className="home_right">
                {
                    users[0]?.map((user)=>(
                        <Link id={user.id} style={{'textDecoration':'none','color':'black'}} to={`/user/${user.id}`}><UserCard currentuser={user.data()}/></Link> 
                    ))
                }
            </div>
        </div>
    )
}

export default Home