import { useState, useEffect } from "react";
import { Edit2, Trash2 } from "lucide-react";
import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Category {
    image: string;
    name: string;
    status: string;
    created_at: string;
    id: number;
}

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        axios
            .get("http://localhost:8000/categories")
            .then((response) => {
                const categoryData = response.data[1];
                setCategories(categoryData);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching categories:", error);
            });
    }, []);
    const deleteCategory = (id: number) => {
        axios
            .delete(`http://localhost:8000/deletecategory/${id}`)
            .then((res) => {
                setCategories(
                    categories.filter((category) => category.id !== id)
                );
            })
            .catch((err) => {
                console.error("Error deleting category:", err);
            });
    };

    return (
        <main className="bg-[#1A1A1A] min-h-[100vh] flex text-white">
            <SideNav selectedPage="categories" className="w-[450px]" />
            <section className="w-full">
                <TopBar />
                {loading ? (
                    <p className="text-center mt-10 h-[50vh] w-full flex items-center justify-center ">
                        <LoadingSpinner />
                    </p>
                ) : (
                    <section className="px-[50px]">
                        <table className="w-full items-center mt-[100px]">
                            <thead className="w-full items-center">
                                <tr className="w-full text-center h-[80px] ">
                                    <td>Image</td>
                                    <td>Name</td>
                                    <td>Status</td>
                                    <td>CreateDate</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody className="w-full border-separate">
                                {categories.map((category) => (
                                    <TableItem
                                        key={category.id}
                                        category={category}
                                        deleteCategory={deleteCategory}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </section>
        </main>
    );
}

interface TableItemProps {
    category: Category;
    deleteCategory: (id: number) => void;
}

function TableItem(props: TableItemProps) {
    const createdDate = props.category.created_at
        ? props.category.created_at.split("T")[0]
        : "";

    return (
        <tr className="text-center rounded-[16px] text-[18px] font-medium h-[90px] w-full border-y border-white/20">
            <td className="relative">
                <img
                    src={props.category.image}
                    className="bg-neutral-200/50 rounded-[8px] absolute left-1/2 -translate-x-1/2 w-[70px] top-1/2 -translate-y-1/2 h-[70px]"
                    alt={props.category.name}
                />
            </td>
            <td>{props.category.name}</td>
            <td>
                <span className="block capitalize font-medium bg-blue-600/40 text-white py-[6px] rounded-full">
                    {props.category.status}
                </span>
            </td>
            <td>{createdDate}</td>
            <td>
                <span className="flex divide-x-2 divide-white/50 items-center w-1/2 translate-x-1/2 bg-white/10 rounded-full text-white/50 ml-2 border justify-center px-2 border-white/10 py-2">
                    <Link
                        key={`edit_${props.category.id}`}
                        to={`/admin/editCategory/${props.category.id}`}
                        className="pr-5">
                        <Edit2 className="transition-all hover:stroke-blue-400 hover:cursor-pointer hover:scale-110" />
                    </Link>

                    <span
                        onClick={() => props.deleteCategory(props.category.id)}
                        className="pl-5">
                        <Trash2 className="transition-all hover:stroke-red-400 hover:cursor-pointer hover:scale-110" />
                    </span>
                </span>
            </td>
        </tr>
    );
}
