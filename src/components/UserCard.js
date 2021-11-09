import React from 'react'
import '../assets/UserCard.css'
import user from '../data/user.png'



function UserCard({currentuser}) {
    return (
        <div className='usercard'>
            <img src={user}/>
            <div className='usercard_name'>{currentuser?.name}</div>
            <div className='usercard_bio'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                 exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            {/* <div className='usercard_stats'>
                <i class="far fa-bell">5</i>
            </div> */}
        </div>
    )
}

export default UserCard
