import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Bell, Menu, Search } from "lucide-react";

type Props = {
    className?: string;
};

export default function TopBar(props: Props) {
    return (
        <header className={cn("pt-[30px]   px-[40px]", props.className)}>
            <div className=" h-[90px] flex items-center px-[20px] rounded-[6px] bg-neutral-800">
                <Menu className="w-[45px] h-[45px] opacity-75 hover:scale-105 transition-transform active:scale-100" />
                <div className=" w-[400px] relative  h-[45px] ml-[24px] ">
                    <Search className="absolute top-1/2 -translate-y-1/2 opacity-40 ml-3" />
                    <Input
                        placeholder="Search for something..."
                        type="text"
                        className=" bg-neutral-900/80 h-full rounded-md pl-10 placeholder:text-neutral-500 text-[16px] w-full border-white/10 focus:ring-0"
                    />
                </div>
                <Bell className="ml-auto hover:scale-105 active:scale-100 transition-transform  mr-5 w-[27px] h-[27px] opacity-65" />
                <div className="flex items-center mr-4">
                    Hello,{" "}
                    <span className="ml-1 text-[18px] first-letter:uppercase font-medium">
                        yassine ben azouz
                    </span>
                    <span className="w-[50px] ml-4 h-[50px] bg-neutral-300 rounded-full block"></span>
                </div>
            </div>
        </header>
    );
}
