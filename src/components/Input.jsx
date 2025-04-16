import React, { useId } from "react";

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    classname = '',
    ...props
},ref){
    const id = useId();
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1 pl-1"  htmlFor = {id}>
                {label}</label>} 
            <input type={type} className={`px-3 py-2 rounded-2xl bg-white text-black outline-none focus:bg-gray-200 duration-200 border w-full ${classname}`} ref={ref} {...props} id={id}>
            </input>
        </div>
    )   

})

export default Input;