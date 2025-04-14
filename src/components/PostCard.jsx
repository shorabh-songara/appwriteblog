import React from "react";
import blogs from "../appwrite/database";
import { Link } from "react-router-dom";
function PostCard({$id , title , featuredimg}){
    return (

        <Link  to = {`/post/${$id}`}>
            <div className="w-full bg-gray-200 rounded-xl p-4 ">
                <div className="w-full justify-center mb-4">
                    <img src={blogs.getfilePrev(featuredimg)} alt={title} className="rounded-xl">

                    </img>
                    <h2>{title}</h2>

                </div>

            </div>
        </Link>


    )
}
export default PostCard;