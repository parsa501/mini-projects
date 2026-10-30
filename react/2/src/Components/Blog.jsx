import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import Body from "./Body";
export default function Blog() {
    const [posts,setPosts]=useState()
    const [currentIndex,setCurrentIndex]=useState(0)
    const handleCurrentIndex=(index)=>{
        setCurrentIndex(index)
    }
    useEffect(()=>{
        (async () => {
            try {
                const res=await fetch('http://localhost:3000/posts')
                const data=await res.json()
                setPosts(data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[])
  return (
    <div className="container">
      {posts ? (
        <>
          <Aside posts={posts}  handleCurrentIndex={handleCurrentIndex}/>
          <Body post={posts[currentIndex]} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
