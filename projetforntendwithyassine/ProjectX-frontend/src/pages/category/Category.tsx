import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
interface ServiceProps {
    text: string;
    image: string;
    title: string;
}

const Category: React.FC<ServiceProps> = ({ text, image, title }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const handleMouseMove = (e: any) => {
        const boundingRect = cardRef.current?.getBoundingClientRect();
        if (!boundingRect) return;

        const x = e.clientX - boundingRect?.x;
        const y = e.clientY - boundingRect?.y;
        document.documentElement.style.setProperty("--home-card-x", `${x}px`);
        document.documentElement.style.setProperty("--home-card-y", `${y}px`);
    };
    const handleMouseLeave = () => {
        cardRef.current?.classList.remove("home-card-gradient");
    };
    const handleMouseEnter = () => {
        cardRef.current?.classList.add("home-card-gradient");
    };

    console.log(image)
    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            ref={cardRef}
            className=" border hover:border-white/20 transition-all p-8 h-[270px] border-white/5 hover:cursor-pointer  flex flex-col rounded-lg  ">
            <div className="flex items-center w-20 h-20  rounded-md">
                <img
                    src={image}
                    alt={title}
                    className="w-[150px] border border-red-600 brightness-0 invert"
                />
                <h2 className="font-semibold  w-fit text-[28px] tracking-wide opacity-90">
                    {title}
                </h2>
            </div>

            <p className="line-clamp-2 text-[16px] mt-[12px] text-white/70">
                {text}
            </p>
            <Button className="black mt-5 hover:opacity-90 active:scale-[98%] transition-transform  text-white flex items-center  w-full group font-semibold text-[24px] ">
                Check Services{" "}
                <ArrowRight className="stroke-[2.5] translate-y-[2px] ml-[3px] group-hover:translate-x-[8px] group-hover:scale-110  transition-transform " />
            </Button>
        </div>
    );
};

export default Category;
