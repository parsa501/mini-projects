import React, { useEffect, useState } from 'react'

export default function ChangeTitle() {
    const [inp,setInp]=useState('react')
    // useEffect(()=>{
    //     return ()=>{

    //     }
    // },[inp])
    useEffect(()=>{
        document.title=inp
    },[inp])
  return (
    <div>
      <input type="text" onChange={(e)=>setInp(e.target.value)}
       value={inp} name="" id="" />
    </div>
  )
}
