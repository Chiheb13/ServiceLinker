import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Category from "./Category";
import LoadingPage from "@/components/shared/LoadingPage";
import { log } from "console";

interface CategoryData {
    id: number;
    name: string;
    desc: string;
    image: string;
    status: string;
}

const CategoryCards = () => {
    const [onlineCategories, setOnlineCategories] = useState<CategoryData[]>(
        []
    );
    const [offlineCategories, setOfflineCategories] = useState<CategoryData[]>(
        []
    );
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/categories"
                );
                const responseData = response.data[1]; // Accessing data array at index 1
                const allCategories = responseData as CategoryData[];
                console.log('hello',allCategories);
                const onlineCategories = allCategories.filter(
                    (category) => category.status === "online"
                    
                );
                const offlineCategories = allCategories.filter(
                    (category) => category.status === "offline"
                );

                setOnlineCategories(onlineCategories);
                setOfflineCategories(offlineCategories);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching categories:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="bg-[#1A1A1A] min-h-screen text-white">
            <Navbar page="Categories" />
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mt-20">
                    <h1 className="text-4xl font-extrabold">Categories</h1>
                    <p className="mt-7 text-lg text-gray-300">
                        We offer a variety of Categories
                    </p>
                </div>
                {loading ? (
                    <LoadingPage className="absolute left-0 z-50 top-0 w-[95vw] h-[100vh]" />
                ) : (
                    <>
                        {onlineCategories.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold">
                                    Online Categories
                                </h2>
                                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {onlineCategories.map((category) => (
                                        <Category
                                            key={category.id}
                                            title={category.name}
                                            text={category.desc}
                                            image={category.image}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {offlineCategories.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold">
                                    Offline Categories
                                </h2>
                                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                    {offlineCategories.map((category) => (
                                        <Category
                                            key={category.id}
                                            title={category.name}
                                            text={category.desc}
                                            image={category.image}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </section>
            <Footer />
        </main>
    );
};

export default CategoryCards;
