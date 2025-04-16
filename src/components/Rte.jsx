import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm , Controller } from "react-hook-form";
import config from "../config/config";
export default function Rte({
    name, 
    control,
    label,
    defaultValue = ""
}){
    const {handleSubmit , Control } = useForm();
    return(
        <div className="w-full">
            {
                label && <label className= "inline-block pl-2 mb-1">
                    {label}
                </label>
            }

            <Controller
            name={name || "content"}
            control={control}
            render={({field : {onChange}})=> (
                <Editor
                apiKey={config.tinymceApiKey}
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