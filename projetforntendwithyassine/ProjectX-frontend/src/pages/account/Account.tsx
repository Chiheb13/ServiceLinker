import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Services from "./Services";
import LoadingPage from "@/components/shared/LoadingPage";
import useUserData from "@/hooks/useUserData";
import axios from "axios";

type UserData = {
    name: string;
    email: string;
    img: string;
    created_at: string;
    updated_at: string;
    services: {
        id: string;
        name: string;
        desc: string;
        image: string;
        price: number;
        category: {
            name: string;
        };
    }[];
};
export default function Account() {
    const params = useParams();
    const userId = params?.id;

    const [userData, setUserData] = useState<UserData | null>(null);
    const [, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user: currentUser } = useUserData();

    useEffect(() => {
        api.get(`/api/userData/${userId}`)
            .then((response) => {
                setUserData(response.data);
            })
            .catch((err) => {
                setIsError(true);
                console.error(err);
            })
            .finally(() => setIsLoading(false));
    }, []);
    const isAccountOwner = userData?.email == currentUser?.email;
    console.log(isAccountOwner);
    if (isLoading) return <LoadingPage />;

    const logout = () => {
        axios
            .post("http://localhost:8000/logout", null, {
                withCredentials: true,
                withXSRFToken: true,
            })
            .then((res) => {
                //setUser(null);
                console.log(res);
                window.location.href = "http://localhost:5173/login";
            });
    };

    return (
        <main className="bg-[#1A1A1A] min-h-[100vh]  text-white">
            {/* <Navbar page="Home" /> */}

            <section className="bg-[#e45940]/30 flex h-[300px] w-full">
                <img
                    className="bg-contain bg-center bg-neutral-100  w-[200px] mt-auto translate-y-[30%] mx-auto h-[200px]  rounded-full"
                    alt=""
                    src={userData?.img ?? ""}
                    referrerPolicy="no-referrer"
                />
            </section>
            <section className="px-[200px] w-full">
                <h2 className="text-[44px] mt-[130px] font-medium">
                    Name :{" "}
                    <span className="font-light text-[40px]">
                        {userData?.name}
                    </span>
                </h2>
                <h2 className="text-[44px] mt-[30px] font-medium     ">
                    Email :{" "}
                    <span className="font-light text-[40px]">
                        {" "}
                        {userData?.email}
                    </span>
                </h2>
                <div className="w-full flex items-center justify-center">
                    <button
                        onClick={logout}
                        className="border  bg-white font-medium rounded-sm hover:bg-neutral-700 hover:border-white/20 hover:text-white transition-colors text-[24px] text-black w-[300px] h-[50px]">
                        Logout
                    </button>
                </div>

                <Services
                    services={userData?.services ?? []}
                    isAccountOwner={isAccountOwner}
                />
            </section>
        </main>
    );
}
