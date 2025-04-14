import React, { useEffect, useState } from "react";
import { Container , PostCard } from "../components";

import blogs from "../appwrite/database";
function AllPost(){
    const [posts , setPosts] = useState([])
    useEffect(()=>{},[])

    blogs.listPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
            
        }
    })
    
    return (
        <div className="w-full py-8">
            <Container>
                    {
                        posts.map((post)=>(
                            <PostCard key={post.$id} post = {post}>

                            </PostCard>
                        ))
                    }
            </Container>
        </div>
            
    )
}
export default AllPost;