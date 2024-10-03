import LoadingPage from "@/components/shared/LoadingPage";
import ServiceCard from "@/components/shared/ServiceCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
} from "@/components/ui/carousel";
import axios from "axios";
import { useEffect, useState } from "react";

interface Service {
    id: number;
    image: string;
    name: string;
    price: number;
    category: string;
    user_id: number;
    situation: string;
    desc: string;
}

export default function NewServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/lastservice")
            .then((response) => {
                const serviceData = response.data.data;
                setServices(serviceData);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching services:", error);
            });
    }, []);

    return (
        <section className="mt-[40px] gap-x-[30px] gap-y-6">
            {loading ? (
                <LoadingPage className="absolute w-[97vw] h-[90vh] top-0 left-0" />
            ) : (
                <Carousel>
                    <CarouselContent>
                        {services.map((service) => (
                            <CarouselItem key={service.id} className="basis-[420px]">
                                <ServiceCard
                                    image={service.image}
                                    id={service.id}
                                    name={service.name}
                                    desc={service.desc}
                                    category={service.category} // Pass category name instead of ID
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselNext
                        className="bg-white/5 scale-125 hover:bg-white/10 hover:texts-white"
                        variant={"ghost"}
                    />
                </Carousel>
            )}
        </section>
    );
}
