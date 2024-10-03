import Navbar from "@/components/shared/Navbar";
import Hero from "./Hero";
import SimilarServices from "./SimilarServices";
import Footer from "@/components/shared/Footer";
import useScrollReset from "@/hooks/useScrollReset";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Service() {
    useScrollReset();
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        if (id) {
            const serviceId = parseInt(id); // Convertir l'ID en nombre
            axios.get(`http://localhost:8000/servicedetails/${serviceId}`)
                .then(response => {
                    setService(response.data);
                })
                .catch(error => {
                    console.error("Error fetching service details:", error);
                });
        }
    }, [id]);

    if (!service) {
        return null; 
    }

    return (
        <main className="bg-[#1A1A1A] min-h-[100vh]  text-white">
            <Navbar page="services" />
            <Hero service={service} /> 
            <section className="px-[150px]">
                <h2 className="text-[40px] mt-[80px]  font-bold">
                    Similar Services <span className="text-[32px]">✨</span>
                </h2>
                {id &&<SimilarServices serviceId={parseInt(id)} />}
            </section>
            <Footer />
        </main>
    );
}
