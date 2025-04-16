import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import {Input , Button , Rte, Select} from '../index'
import blogs from "../../appwrite/database";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function PostForm({post}){

    const {handleSubmit , register , watch , control , setValue , getValues} = useForm(
        {
            defaultValues :{
                title : post?.title || "",
                slug : post?.slug || "",
                content : post?.content || "",
                status : post?.status || "active",
            },
        }
    )
    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);
    const submit = async(data) => {
        if (post) {
            const file = data.image[0] ? blogs.uploadFile(data.image[0]) : null
            if (file) {
                blogs.deleteFile(post.featuredImg)
            }
            const dbpost =  await blogs.updatePost(post.$id , {
                ...data ,
                 featuredImg: file? file.$id : undefined ,
                })
                 if (dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                 }  


        }else{

            const file = await blogs.uploadFile(data.image[0])

            if(file){
                const fileId = file.$id;
                console.log(fileId)
                data.featuredImg = fileId;
                console.log("UserData:", userData);
                const dbpost = await blogs.createPost({
                    ...data,
                    userId : userData.userData?.$id
                })
                if (dbpost) {
                    navigate(`/post/${dbpost.$id}`)
                }
            }

        }
    }

    const slugTransform = useCallback((value)=>{
        if(value &&   typeof value === 'string'){
            
            return value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        }
        return ""; 
    },[])
    //subcription banta hai watch method se 
    useEffect(()=>{
        const subcription = watch((value , {name})=>{
            if (name === 'title') {
                setValue('slug' , slugTransform(value.title , {shouldValidate:true }))
                
            }
            
        })

        return ()=>{
            subcription.unsubscribe();
        }
    },[watch , slugTransform , setValue])
    return(
        <form onSubmit={handleSubmit(submit)} className="flex  flex-wrap">
            <div className="w-2/3 px-2">
            <Input
            label = "Title:-"
            placeholder = "Title"
            className= "mb-4"
            {...register("title" , {
                required:true
            })}/>
            <Input
            label="slug-"
            placeholder="slug"
            className = "mb-4"
            {...register("slug" , {
                required:true
            })}
            onInput = {(e)=>{
                setValue('slug' , slugTransform(e.currentTarget.value),{
                    shouldValidate:true
                })
            }}
            />

            <Rte
            label="Content:-"
            name="content"
            control={control}
            defaultValue={getValues("content")}/>

            </div>

            <div className="w-1/3 px-2">
            <Input
            label = "featuredImage:-"
            type = 'file'
            className = "mb-4"
            accept = "image/png , image/jpg , image/jpeg , image/gif"
            {...register("image" , {
                required: !post
            })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                    src={blogs.getfilePrev(post.featuredImg)}
                    alt={post.title}
                    className="rounded-lg"
                    ></img> 

                </div>

            )}
            <Select
            options = {["active" , "inactive"]}
            label = "status"
            className = "mb-4"
            {...register("status", { required: true })}
            />
            <Button
            type = "submit"
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full">
                {post ? "update" :"submit"}
            </Button>

            </div>

        </form>
    )
}
export default PostForm;