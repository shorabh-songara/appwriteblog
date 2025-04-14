import React , {useState} from "react";
import auth from "../appwrite/auth";
import {Input , Button , Logo} from './index'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link , useNavigate } from "react-router-dom";

function Signup(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error , setError] = useState("");
    const {handleSubmit , register} = useForm();

    const signUp = async(data) => {
        setError("");
        try {
                const userdata  = await auth.createAccount(data);
                if (userdata) {
                    const userdata = await auth.getCurrentUser()
                    if (userdata) {
                        dispatch(login(userdata))
                    }
                    navigate("/");
                    
                }
            
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width = "100%"/>
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">sign up to create account</h2>
            <p>
                Already have an account?&nbsp;
                <Link
                to= "/Login">
                sign in
                </Link>
            </p>
            {error && <p className="text-red-500 mt-8 text-center">{error}
                </p>}
            <form onSubmit={handleSubmit(signUp)}>
                <div className="space-y-5">
                    <Input
                    lable = "Name:-"
                    placeholder ="Enter your name"
                    type = "text"
                    {
                        ...register("name" , {
                            required:true,
                        })
                    }
                    />
                    <Input/>
                    <Input 
                        lable = "Email:-"
                        placeholder= "Enter your Email"
                        type = "email"
                        {...register("email" , {
                        required:true,                       
                        validate:{            
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                        }
                                                    
                    })}
                    />

                    <Input
                    lable = "Password"
                    placeholder = "Enter your password"
                    type = "password"
                    {...register("password" , {
                        required:true,
                        validate:{
                            length:8
                        }
                    })}
                    />

                    <Button
                    children="sign-up"
                    type = "submit"
                    className="w-full">
                        {children }
                    </Button>


                </div>

            </form>

            </div>

        </div>
    )
}
export default Signup;