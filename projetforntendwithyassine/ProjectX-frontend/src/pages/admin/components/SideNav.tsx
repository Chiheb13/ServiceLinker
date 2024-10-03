import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Activity, LayoutDashboard, LogOut, Star, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
    className?: string;
    selectedPage: "dashboard" | "categories" | "services" | "users";
};

export default function SideNav(props: Props) {
    const links = [
        { link: "dashboard", icon: Activity },
        { link: "categories", icon: LayoutDashboard },
        { link: "services", icon: Star },
        { link: "users", icon: Users2 },
    ];

    return (
        <div
            className={cn(
                "py-[30px] pl-[20px] max-h-[100vh]",
                props.className
            )}>
            <div className="h-full relative py-[24px] bg-neutral-800 border border-white/10 rounded-[16px]">
                <div className="flex text-[24px] mt-3  text-white/80  items-end gap-3 justify-center font-medium ">
                    <Logo className="opacity-80 w-7" />
                    Admin dashboard
                </div>
                <div className="flex flex-col mt-36">
                {links.map(({ link, icon: Icon }, index) => (
    <Link key={link} to={`/admin/${link}`} className={cn(
        "first-letter:uppercase w-full   border-white/20 flex items-center  hover:pl-10 hover:bg-black/40 transition-all  pl-8  h-[70px] text-center text-[22px] font-medium",
        {
            "border-y bg-black/30 rounded-[4px]  ": props.selectedPage === link,
        }
    )}>
        <Icon className="mr-3" />{" "}
        <span className="first-letter:uppercase">
            {link}
        </span>
    </Link>
))}

                </div>
                <Link
                    to={`/`}
                    className={
                        "first-letter:uppercase w-full bottom-0 mt-auto rounded-b-[16px]  absolute border-white/20 flex items-center  hover:pl-10 hover:bg-black/40 transition-all  pl-8  h-[70px] text-center text-[22px] font-medium"
                    }>
                    <LogOut className="mr-3" />{" "}
                    <span className="first-letter:uppercase">Logout</span>
                </Link>
            </div>
        </div>
    );
}
