import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import auth from "../appwrite/auth";
import {Button, Logo , } from "./index"
import { login as authlogin } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "./Input";
function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {handleSubmit , register} = useForm();
    const [error , setError] = useState("");

    const login = async(data) => {
        setError("");
        try {
            const session = await auth.login(data);
            if (session) {
                const userdata = await auth.getCurrentUser();
                if (userdata) {
                    dispatch(authlogin(userdata));
                    navigate("/")
                }
            }
            
        } catch (error) {
            setError(error.message)
        }
    }
    return(
        <div className="flex items-center justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className=" inline-block w-full max-w-[100px]:">
                    <Logo width="100%"></Logo>

                </span>

                <h2 className=" text-center text-2xl font-bold leading-tight ">
                    sign in to your account
                </h2>

                <p
                className="mt-2 text-center text-base text-black/10">
                    Don&apos;t have any account?&nbsp;
                    <Link
                    to = "/signUp"
                    className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign-up
                    </Link>

                </p>
                {error && <p className=" text-red-500 text-center">{error}
                    </p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
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
                        lable = "Password:-"
                        placeholder = "Enter your password"
                        type = "password"
                        {
                            ...register("password" , {
                                required:true,
                                validate:{
                                    length:10
                                }
                            })
                        }

                        />

                        <Button
                        children="Sign-in"
                        type="submit"
                        className="w-full"
                        />

                    </div>

                </form>


            </div>

            </div>

        </div>
    )
}
export default Login;