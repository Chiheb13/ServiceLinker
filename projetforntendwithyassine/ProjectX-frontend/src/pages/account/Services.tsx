// import ServiceCard from "@/components/shared/ServiceCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

type Props = {
    isAccountOwner: boolean;
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

export default function Services(props: Props) {
    return (
        <section className=" mt-[100px]    gap-x-[30px] gap-y-6">
            {props.services.length >= 1 ? (
                <Carousel>
                    <CarouselContent>
                        {props.services.map((_, i) => (
                            <CarouselItem key={i} className="basis-[420px]">
                                {/* <ServiceCard  /> */}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {props.services.length > 3 && (
                        <CarouselNext
                            className="bg-white/5 scale-125 hover:bg-white/10 hover:texts-white"
                            variant={"ghost"}
                        />
                    )}
                </Carousel>
            ) : (
                <>
                    <div className="text-[40px] text-center text-white/50 mt-[150px]">
                        {" "}
                        You have no services.{" "}
                    </div>

                    {props.isAccountOwner && (
                        <Link
                            to={"/addService"}
                            className="text-blue-400 w-full text-center  block text-[20px] underline ">
                            Add one ?
                        </Link>
                    )}
                </>
            )}
        </section>
    );
}
