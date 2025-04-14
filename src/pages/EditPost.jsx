import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogs from "../appwrite/database";
import { set } from "react-hook-form";
import { Container, PostForm } from "../components";
function EditPost(){
    const [post , setPost] = useState([])
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            blogs.getPost({slug}).then((post) => {
                if (post) {
                    setPost(post)
                }
            })

        }else{
            navigate("/")
        }

    }, [slug , navigate ])
    return post ? (

        <div className="py-8">
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null;
}
export default EditPost;