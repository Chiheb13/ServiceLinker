import AuthFormPattern from "@/components/svg/AuthFormPattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
    Mail,
    User,
    FingerprintIcon,
    CheckCheckIcon,
    Eye,
    EyeOff,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../lib/axios";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import useUserData from "@/hooks/useUserData";

export default function Register() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isVerifPasswordVisible, setIsVerifPasswordVisible] = useState(false);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerification, setPasswordVerification] = useState("");

    const navigate = useNavigate();

    const { user } = useUserData();
    if (user?.id) {
        navigate("/");
    }

    const [errors, setErrors] = useState<
        Record<
            "email" | "all" | "name" | "password" | "passwordVerification",
            string
        >
    >({
        email: "",
        all: "",
        name: "",
        password: "",
        passwordVerification: "",
    });

    const validateFields = () => {
        if (!email.includes("@")) {
            setErrors({ ...errors, email: "Non valid email address." });
            toast.error("Please enter a valid email address.");
            return false;
        }
        if (name.length < 1) {
            setErrors({ ...errors, name: "Too short name." });
            toast.error("Please enter a valid name.");
            return false;
        }

        if (password.length < 6) {
            setErrors({
                ...errors,
                password:
                    "Too short password must be at least 6 characters long.",
            });
            toast.error("Password must be at least 6 characters long.");
            return false;
        }

        if (password !== passwordVerification) {
            setErrors({
                ...errors,
                password: "Password and its verification doesn't match.",
                passwordVerification:
                    "Password and its verification doesn't match.",
            });
            toast.error("Passwords do not match.");
            return false;
        }

        return true;
    };

    useEffect(() => {
        setErrors({
            all: "",
            email: "",
            password: "",
            passwordVerification: "",
            name: "",
        });
    }, [email, password, name, passwordVerification]);

    const registerUser = async () => {
        if (!validateFields()) return;
    
        try {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie");
            const body = {
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordVerification,
            };
            await axios.post("http://localhost:8000/register", body);
    
            navigate("/");
        } catch (error) {
            toast.error("An error occurred.");
            console.error(error);
        }
    };
    

    const inputClassName =
        "h-[55px]  rounded-[8px] border-transparent  w-[90%] border-gray-200/10 focus-visible:shadow-md  transition-all focus-visible:shadow-blue-50/20 focus-visible:border-blue-200/10  font-medium placeholder:font-normal text-[20px] placeholder:text-[18px] placeholder:text-white/40 text-white bg-[#494945]  pl-[30px]";
    const iconClassName =
        "absolute stroke-gray-400/60 stroke h-[27px] w-[30px] right-[3%] top-1/2 -translate-y-1/2";
    const eyeClassName =
        "absolute hover:scale-110 transition-all hover:stroke-blue-400 hover:cursor-pointer active:scale-100 stroke-gray-400/60 stroke h-[27px] w-[30px] right-[13%] top-[35%] -translate-y-1/2";

    const errorMsgClassName =
        "text-red-500/80 min-h-[20px] font-medium first-letter:uppercase pt-[5px] pl-[10px]";

    const handleLoginWithGoogle = () => {
        window.location.href = "http://localhost:8000/auth/google";
    };

    return (
        <main className="bg-[#1A1A1A]  select-none w-[100vw] flex items-center justify-center h-[100vh] ">
            <form
                onSubmit={(e) => e.preventDefault()}
                className=" flex bg-[#202020]  shadow-[10px_10px_10px_5px_#2020203f] h-[100vh] mt-[40px] mx-auto rounded-[24px]  w-[80vw]  xl:overflow-hidden md:overflow-scroll max-h-[80vh] min-h-[800px] ">
                <div className="w-1/2 h-full  ">
                    <AuthFormPattern className="w-full   rounded-l-[24px] left-0  min-h-full top-0" />
                </div>
                <div className="w-1/2 px-[40px]  ">
                    <h1 className="font-bold text-[44px] text-white  w-full  text-center mt-[30px]  ">
                        Welcome to our website
                    </h1>
                    <p className="text-white/70 px-[100px] text-[16px] font-normal mt-[8px] text-center leading-[24px] ">
                        we are very happy that you are here :D
                    </p>

                    <div className="flex flex-col   gap-[25px] mt-[50px]">
                        <div className="relative  ">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={cn(inputClassName, {
                                    "border-red-300 border-2 shadow-red-500/20 shadow ":
                                        errors.email,
                                })}
                                placeholder="Email@example.com"
                            />
                            <Mail className={iconClassName} />
                            <p className={errorMsgClassName}>{errors.email}</p>
                        </div>
                        <div className="relative">
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={cn(inputClassName, {
                                    "border-red-300 border-2 shadow-red-500/20 shadow ":
                                        errors.name,
                                })}
                                placeholder="Your name"
                            />
                            <User className={iconClassName} />
                            <p className={errorMsgClassName}>{errors.name}</p>
                        </div>
                        <div className="relative">
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={cn(inputClassName, {
                                    "border-red-300 border-2 shadow-red-500/20 shadow ":
                                        errors.password || errors.all,
                                })}
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Password"
                            />
                            <FingerprintIcon className={iconClassName} />
                            {!isPasswordVisible ? (
                                <Eye
                                    onClick={() => setIsPasswordVisible(true)}
                                    className={eyeClassName}
                                />
                            ) : (
                                <EyeOff
                                    onClick={() => setIsPasswordVisible(false)}
                                    className={eyeClassName}
                                />
                            )}
                            <p className={errorMsgClassName}>
                                {errors.password}
                            </p>
                        </div>
                        <div className="relative">
                            <Input
                                value={passwordVerification}
                                onChange={(e) =>
                                    setPasswordVerification(e.target.value)
                                }
                                type={
                                    isVerifPasswordVisible ? "text" : "password"
                                }
                                className={cn(inputClassName, {
                                    "border-red-300 border-2 shadow-red-500/20 shadow ":
                                        errors.passwordVerification ||
                                        errors.all,
                                })}
                                placeholder="Confirm password"
                            />
                            <CheckCheckIcon className={iconClassName} />
                            {!isVerifPasswordVisible ? (
                                <Eye
                                    onClick={() =>
                                        setIsVerifPasswordVisible(true)
                                    }
                                    className={eyeClassName}
                                />
                            ) : (
                                <EyeOff
                                    onClick={() =>
                                        setIsVerifPasswordVisible(false)
                                    }
                                    className={eyeClassName}
                                />
                            )}
                            <p className={cn(errorMsgClassName)}>
                                {errors.all || errors.passwordVerification}
                            </p>
                        </div>
                        <Link
                            to={"/login"}
                            className="underline underline-offset-2 text-blue-600 hover:cursor-pointer hover:underline-offset-4  hover:text-blue-900 transition-all text-[16px] font-medium -translate-y-[10px] active:text-black">
                            have an account?
                        </Link>
                    </div>

                    <Button
                        onClick={registerUser}
                        className="w-[100%] mt-[16px] h-[60px] rounded-[16px] bg-blue-800 text-[22px] hover:scale-[102%]  active:scale-100 active:bg-blue-600 active:text-white ease-in duration-200 transition-all hover:from-blue-600 hover:to-blue-800 hover:bg-gradient-to-bl focus-visible:bg-blue-700 ">
                        Register now
                    </Button>

                    <Button
                        onClick={handleLoginWithGoogle}
                        className="w-[100%]  mt-[20px] h-[60px]  bg-white text-black hover:text-white border-2 rounded-[16px] border-gray-200/10   hover:scale-[102%] active:scale-100 active:bg-black active:text-white ease-in duration-200 transition-all hover:bg-gradient-to-bl hover:from-black/80 hover:to-black/80 text-[20px]">
                        <img
                            src="/assets/google.svg"
                            className="w-[30px] mr-[10px]"
                            alt="google icon"
                        />{" "}
                        Register with Google
                    </Button>
                </div>
            </form>
            <Toaster duration={3500} richColors theme="dark" />
        </main>
    );
}
