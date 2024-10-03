import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Service {
    id: number;
    image: string;
    name: string;
    price: number;
    category_id:number;
    user_id: number;
    desc:string;
}

type Props = {
    service: Service; 
};

export default function Hero({ service }: Props) {
    console.log(service);
    return (
        <section className="flex w-full gap-[50px] px-[150px] h-[500px] mt-[100px]">
            <img
                className="rounded-[16px] "
                src={service.image}
                alt={service.name}
            />
            <div className="w-1/2 pt-[10px] relative flex flex-col">
                <div className="flex items-center">
                    <h1 className="text-[44px] font-bold ">{service.name}</h1>
                    <p className="ml-auto mr-[32px] text-[32px] font-semibold">
                        {service.price} Dt
                    </p>
                </div>
                <p className="mt-[30px] text-[26px] leading-7 text-white/90 font-semibold w-[80%]">
                    Seller :{" "}
                    <span className="border-b-2 border-b-white/30 hover:border-b-white/70 hover:cursor-pointer ml-[4px] text-white/80 font-normal text-[22px]">
                        {service.user_id}
                    </span>
                </p>
                <p className="mt-[5px] font-semibold text-[24px] leading-7 text-white/90 w-[80%]">
                    Description :
                    <span className="not-italic text-white/70 font-normal text-[22px] ml-[12px]">
                        {service.desc}
                    </span>
                </p>

                <Button className="bg-white hover:opacity-90 active:scale-[98%] transition-transform text-black flex items-center w-full group font-semibold text-[24px] mt-auto">
                    Contact seller{" "}
                    <ArrowRight className="stroke-[2.5] translate-y-[2px] ml-[3px] group-hover:translate-x-[8px] group-hover:scale-110 transition-transform " />
                </Button>
            </div>
        </section>
    );
}