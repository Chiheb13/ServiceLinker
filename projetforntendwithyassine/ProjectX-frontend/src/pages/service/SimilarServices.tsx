import ServiceCard from "@/components/shared/ServiceCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
} from "@/components/ui/carousel";
import axios from "axios";
import { useEffect, useState } from "react";

interface SimilarServicesProps {
    serviceId: number;
}

interface Service {
    id: number;
    name: string;
    desc: string;
    category: string;
    image: string;
}

export default function SimilarServices({ serviceId }: SimilarServicesProps) {
    const [similarServices, setSimilarServices] = useState<Service[]>([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/similarServices/${serviceId}`)
            .then((response) => {
                setSimilarServices(response.data.similar_services);
            })
            .catch((error) => {
                console.error("Error fetching similar services:", error);
            });
    }, [serviceId]);

    return (
        <section className="mt-8 gap-x-8 gap-y-6">
            <Carousel>
                <CarouselContent>
                    {similarServices.map((service) => (
                        <CarouselItem key={service.id} className="w-1/3 max-w-[450px]">
                            <ServiceCard
                                id={service.id}
                                name={service.name}
                                desc={service.desc}
                                category={service.category}
                                image={service.image}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext
                    className="bg-white/5 scale-125 hover:bg-white/10 hover:texts-white"
                    variant={"ghost"}
                />
            </Carousel>
        </section>
    );
}
