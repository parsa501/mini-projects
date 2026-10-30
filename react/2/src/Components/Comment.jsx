import React from 'react'

export default function Comment({ comment }) {
  return (
    <div className='comment'>
        <h4>{comment?.author}</h4>
        <p>{comment?.comment}</p>
        <small>{comment?.date}</small>
    </div>
  )
}
