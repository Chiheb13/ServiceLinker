import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { cn } from "@/lib/utils";
import useUserData from "@/hooks/useUserData";

type Props = {
    page: string;
};

export default function Navbar(props: Props) {
    const { user } = useUserData();

    const routes = [
        { name: "Home", route: "/" },
        { name: "Categories", route: "/categories" },
        // { name: "services", route: "/services" },
        { name: "account", route: user ? `accounts/${user.id}` : "/login" },
    ];

    return (
        <nav className="h-[80px]  border-b border-white/10  flex items-center px-[150px] shadow">
            {/* <div className="bg-[#e45940] w-[50px] h-[50px]"></div> */}
            <Logo className="hover:cursor-pointer hover:rotate-180 duration-300 opacity-80  hover:opacity-100 ease-in-out transition-all" />
            <div className="ml-auto text-[20px] font-normal mr-[20px]  flex gap-[20px]">
                {routes.map((route) => (
                    <Link
                        key={route.name}
                        className={cn(
                            "hover:border-[#403F36] border-b-2 hover:opacity-80 border-transparent h-fit transition-colors",
                            {
                                "border-b-2 border-b-white":
                                    props.page === route.name,
                            }
                        )}
                        to={route.route}>
                        {route.name}
                    </Link>
                ))}
            </div>
            <Link
                to={"/addService"}
                className=" hover:scale-105 active:scale-100 border-2 border-[#e45940]/20 flex gap-[8px] group items-center bg-/80 text-white  transition-all shadow-2xl h-[55%] px-[16px]    font-black      drop-shadow-sm shadow-black/20 rounded-[10px] ml-[15px] ">
                Add Service{" "}
                <Plus className=" opacity-80 stroke-[#e45940] fill-[#]  stroke-[3.5]    " />
            </Link>
        </nav>
    );
}
