import React from "react";
import { Editor } from "tinymce";
import { useForm , Controller } from "react-hook-form";
export default function Rte({
    name , 
    control,
    lable,
    defaultValue = ""
}){
    const {handleSubmit , Control } = useForm();
    return(
        <div className="w-full">
            {
                lable && <lable className= "inline-block pl-2 mb-1">
                    {lable}
                </lable>
            }

            <Controller
            name={name || "content"}
            control={control}
            render={({field : {onChange}})=> (
                <Editor
                initialValue = {defaultValue}
                init = {{
                    initialValue : defaultValue,
                    height : 500,
                    menubar : false ,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
                onEditorChange = {onChange}
                />
            )}/>
            
        </div>
    )
}