import { useState, useEffect, lazy } from "react";
import axios from "axios";
import Navbar from "@/components/shared/Navbar";
import SearchServices from "./SearchServices";
import TopServices from "./TopServices";
import NewServices from "./NewServices";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import useScrollReset from "@/hooks/useScrollReset";
const MovingText = lazy(() => import("@/pages/home/MovingText"));

export default function Home() {
    useScrollReset();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Scroll to the top when component mounts
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-[#1A1A1A] min-h-[100vh] text-white">
            <Navbar page="Home" />
            <section className="mx-[150px]">
                <MovingText />
                <SearchServices />
                <h2 className="text-[40px] mt-[150px]  font-bold">
                    Top services <span className="text-[32px]">⭐️</span>
                </h2>
                <TopServices />
                <h2 className="text-[40px] mt-[100px]  font-bold">
                    New services <span className="text-[32px]">✨</span>
                </h2>
                <NewServices />
            </section>
            <Footer />
        </main>
    );
}
