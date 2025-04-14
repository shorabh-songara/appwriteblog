import React, { useId } from "react";
function Select({
    options,
    lable,
    className,
    ...props
},ref){
    const id = useId()
    return (
        <div className="w-full">
            {lable && <lable htmlFor = {id} className=''></lable>}
            <select
            {...props}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-2xl bg-white text-black outline-none  focus:bg-gray-200 duration-200 border border-e-amber-100 w-full ${className}`}>

                {options?.map((option)=>(
                    <option key={option} value={option}>
                            {option}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default React.forwardRef(Select);