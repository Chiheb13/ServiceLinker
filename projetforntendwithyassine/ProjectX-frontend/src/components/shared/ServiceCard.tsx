import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
    id: number;
    name: string;
    desc: string;
    category: string; // Change category type to string
    image: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
    id,
    name,
    desc,
    category,
    image,
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/service/${id}`);
    };

    return (
        <div
            className="border hover:border-white/20 transition-all  p-[28px] border-white/5 hover:cursor-pointer h-[440px] flex flex-col rounded-lg bg-[#202020]"
            onClick={handleClick}>
            <p className="font-semibold line-clamp-1  w-fit text-[28px] tracking-wide opacity-90">
                {name}
            </p>
            <p className="text-[#ea7649] font-medium  text-[16px]">
                Category : {category}
            </p>

            <img
                src={image ?? ""}
                alt=""
                className={cn(
                    "w-full bg-gradient-to-tr from-neutral-200 to-white/50  h-[200px] rounded-t-[4px] object-cover bg-center mt-[20px]",
                    { "animate-pulse": !image }
                )}
            />

            <p className="line-clamp-2 text-[16px] mt-[24px] text-white/70">
                {desc}
            </p>
        </div>
    );
};

export default ServiceCard;
