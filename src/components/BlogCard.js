import React from 'react'
import '../assets/BlogCard.css'

function BlogCard({currentblog}) {
    return (
        <div className='blogCard'>
            <div className='blogCard_title'>{currentblog?.title}</div>
            <div className='blogCard_tags'>
                <div>blog</div>
                <div>definition</div>
                <div>info</div>
                <div>tech</div>
            </div>
            <div className='blogCard_content' dangerouslySetInnerHTML={{__html: currentblog?.content}}>
                {/* {currentblog?.content} */}
            </div>
        </div>
    )
}

export default BlogCard
