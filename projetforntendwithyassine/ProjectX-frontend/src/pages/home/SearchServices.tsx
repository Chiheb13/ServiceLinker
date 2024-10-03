import { ChevronDownSquare, Search } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type ServiceData = {
    name: string;
    id: number;
};

export default function SearchServices() {
    const [allServices, setAllServices] = useState<ServiceData[]>();
    const [visibleServices, setVisibleServices] = useState<ServiceData[]>([]);
    const [isOverSuggestions, setIsOverSuggestion] = useState<boolean>(false);

    useEffect(() => {
        axios
            .get("http://localhost:8000/servicesName")
            .then(({ data }: any) => {
                setAllServices(data.data);
            })
            .catch(() => toast.error("An error has been accrued"));
    }, []);

    const handleChange = (e: any) => {
        const value = e.target.value;
        if (allServices) {
            setVisibleServices(
                allServices?.filter((service) => {
                    return service.name.toLowerCase().includes(value);
                })
            );
        }
    };
    const handleBlur = () => {
        if (!isOverSuggestions) {
            setVisibleServices([]);
        }
    };
    const navigate = useNavigate();
    return (
        <div className="relative">
            <div className="mt-[50px]  justify-center flex items-center ">
                <div className="relative">
                    <Input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="text"
                        placeholder="Search for a service..."
                        className="bg-[#2A2A2A]/80 pl-[24px] focus-within:ring-2 focus-within:ring-[#ea7649]/20 focus-within:shadow-md focus-within:shadow-[#ea7649]/10 transition-all   rounded-r-none text-[20px] text-white placeholder:text-white/30 placeholder:font-normal font-medium  h-[60px]  border-transparent  w-[600px]"
                    />
                    <Search className="absolute top-1/2 -translate-y-1/2 opacity-30 right-[30px] stroke-[3] scale-105" />
                </div>
                <Button className="h-[60px] opacity-80 bg-[#2A2A2A]/80 ml-[6px] px-[24px] rounded-l-none text-[18px]">
                    Search
                </Button>
                {visibleServices.length > 0 && (
                    <div
                        onMouseOver={() => setIsOverSuggestion(true)}
                        onMouseLeave={() => setIsOverSuggestion(false)}
                        className=" absolute bg-white/10 rounded-b-[12px]  mt-1 top-full w-[715px] pb-2 ">
                        {visibleServices?.map((service) => {
                            return (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        navigate(`/service/${service.id}`);
                                    }}
                                    className="py-2 pl-3 text-[18px] hover:cursor-pointer font-medium hover:bg-black/20">
                                    {service.name}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
