import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function Post(){
    const [posts , setPosts ] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    const useData = useSelector(state => state.auth.useData)
    
    const isAuthor = posts && useData ? posts.userId === useData.$id : false;

    useEffect(()=>{},[

    ])

    


    
}

export default Post;