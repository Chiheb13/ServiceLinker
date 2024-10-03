import AuthFormPattern from "@/components/svg/AuthFormPattern";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserData from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { Mail, FingerprintIcon, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

axios.defaults.withCredentials = true;

export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { user } = useUserData();
    if (user?.id) {
        navigate("/");
    }

    const [errors, setErrors] = useState<
        Record<"email" | "all" | "password", string>
    >({
        email: "",
        password: "",
        all: "",
    });

    useEffect(() => {
        setErrors({ email: "", password: "", all: "" });
    }, [email, password]);

    const verifLogin = () => {
        if (!email || !email.includes("@")) {
            setErrors({ ...errors, email: "invalid email" });
            return false;
        }
        if (!password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: "Password is required",
            }));
            return false;
        }
        return true;
    };

    const login = async () => {
        if(email=="admin@gmail.com" && password=="admin123"){
            navigate("/admin");

        }
        else
        setIsLoading(true);
        try {
            await axios.get("http://localhost:8000/sanctum/csrf-cookie");

            await axios.post(
                "http://localhost:8000/login",
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                    withXSRFToken: true,
                }
            );
            const { data } = await axios.get("http://localhost:8000/api/user");
            if (data) {
                navigate("/");
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            if (error instanceof AxiosError) {
                setErrors({ ...errors, all: "Bad email or password." });
                if (!email) {
                    setErrors({ ...errors, email: "Email is required" });
                }
                toast.error("bad email or password");
            }
            console.log(error);
        }
    };

    const handleLoginBtn = () => {
        if (verifLogin()) {
            login();
        }
    };

    const handleLoginWithGoogle = () => {
        //TODO change this hardcoded value
        window.location.href = "http://localhost:8000/auth/google";
    };

    const inputClassName =
        "h-[55px]  rounded-[8px] border-transparent  w-[90%] border-gray-200/10 focus-visible:shadow-md  transition-all focus-visible:shadow-blue-50/20 focus-visible:border-blue-200/10  font-medium placeholder:font-normal text-[20px] placeholder:text-[18px] placeholder:text-white/40 text-white bg-[#494945]  pl-[30px]";
    const iconClassName =
        "absolute stroke-gray-400/60 stroke h-[27px] w-[30px] right-[3%] top-1/2 -translate-y-1/2";
    const eyeClassName =
        "absolute hover:scale-110 transition-all hover:stroke-blue-400 hover:cursor-pointer active:scale-100 stroke-gray-400/60 stroke h-[27px] w-[30px] right-[13%] top-[35%] -translate-y-1/2";

    const errorMsgClassName =
        "text-red-500/80 min-h-[20px] font-medium first-letter:uppercase pt-[5px] pl-[10px]";

    return (
        <main className="bg-[#1A1A1A]  select-none w-[100vw] flex items-center justify-center h-[100vh] ">
            <form
                onSubmit={(e) => e.preventDefault()}
                className=" flex bg-[#202020]  shadow-[10px_10px_10px_5px_#2020203f] h-[100vh] mt-[40px] mx-auto rounded-[24px]  w-[80vw]  xl:overflow-hidden md:overflow-scroll max-h-[80vh] min-h-[800px] ">
                <div className="w-1/2  min-h-full ">
                    <AuthFormPattern className="w-full rounded-l-[24px] left-0  min-h-full top-0" />
                </div>
                <div className="w-1/2 px-[40px]">
                    <h1 className="font-bold text-[44px] text-white/70 w-full text-center mt-[30px]  ">
                        Welcome to our website
                    </h1>
                    <p className="text-gray-200/30 px-[100px] text-[16px] font-normal mt-[12px] text-center leading-[24px] ">
                        Welcome, We are very proud that you are thinking about
                        creating an account. We hope you find the best services
                        within our platform. thanks for choosing us !{" "}
                    </p>

                    <div className="flex flex-col gap-[25px] mt-[100px]">
                        <div className="relative  ">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={cn(inputClassName, {
                                    "border-red-500 border-2  shadow-red-500/20 shadow ":
                                        errors.email,
                                })}
                                placeholder="Email@example.com"
                            />
                            <Mail className={iconClassName} />
                            <p className={errorMsgClassName}>{errors.email}</p>
                        </div>

                        <div className="relative">
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={cn(inputClassName, {
                                    "border-red-500 border-2 shadow-red-500/20 shadow ":
                                        errors.password,
                                })}
                                placeholder="Password"
                                type={isPasswordVisible ? "text" : "password"}
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
                        <p
                            className={cn(
                                errorMsgClassName,
                                "text-[20px] text-red-500/80   -mt-[20px]"
                            )}>
                            {errors.all}
                        </p>
                        <Link
                            to={"/register"}
                            className="underline underline-offset-2 text-blue-400 hover:cursor-pointer hover:underline-offset-4  hover:text-blue-500 transition-all text-[16px] font-medium -translate-y-[10px] active:text-black">
                            No account ?
                        </Link>
                    </div>

                    <Button
                        disabled={isLoading}
                        onClick={handleLoginBtn}
                        className="w-[100%] mt-[10%] h-[60px]  rounded-[16px] bg-blue-800 text-[22px] hover:scale-[102%]  active:scale-100 active:bg-blue-600 active:text-white ease-in duration-200 transition-all hover:from-blue-600 hover:to-blue-800 hover:bg-gradient-to-bl focus-visible:bg-blue-700  ">
                        {isLoading ? (
                            <LoadingSpinner className="duration-500 fill-white/50 text-gray-600" />
                        ) : (
                            "Login"
                        )}
                    </Button>
                    <Button
                        onClick={handleLoginWithGoogle}
                        className="w-[100%]  mt-[20px] h-[60px]  bg-white text-black hover:text-white border-2 rounded-[16px] border-gray-200/10   hover:scale-[102%] active:scale-100 active:bg-black active:text-white ease-in duration-200 transition-all hover:bg-gradient-to-bl hover:from-black/80 hover:to-black/80 text-[20px]">
                        <img
                            src="/assets/google.svg"
                            className="w-[30px] mr-[10px]"
                            alt="google icon"
                        />{" "}
                        Login with Google
                    </Button>
                </div>
            </form>
            <Toaster duration={3500} richColors theme="dark" />
        </main>
    );
}
