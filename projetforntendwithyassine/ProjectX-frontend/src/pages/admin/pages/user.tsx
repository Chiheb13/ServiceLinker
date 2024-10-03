import { Eye, Trash2 } from "lucide-react";
import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
//
interface User {
    id: number;
    image: string;
    name: string;
    email: string;
}
export default function AdminServices() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        axios
            .get("http://localhost:8000/users")
            .then((response) => {
                const serviceData = response.data[1];
                setUsers(serviceData);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching services:", error);
            });
    }, []);
    const deleteUsers = (id: number) => {
        axios
            .delete(`http://localhost:8000/deleteuser/${id}`)
            .then((res) => {
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== id)
                );
            })
            .catch((err) => {
                console.error("Error deleting category:", err);
            });
    };

    return (
        <main className="bg-[#1A1A1A] min-h-[100vh] flex  text-white">
            <SideNav selectedPage="users" className="w-[450px] " />
            <section className="w-full ">
                <TopBar />
                <section className="px-[50px]">
                    {loading ? (
                        <p className="text-center mt-10 h-[50vh] w-full flex items-center justify-center ">
                            <LoadingSpinner />
                        </p>
                    ) : (
                        <table className="w-full  items-center mt-[100px]">
                            <thead className="w-full items-center">
                                <tr className="w-full text-center h-[80px] ">
                                    <td>Image</td>
                                    <td>Name</td>
                                    <td>email</td>
                                    <td>action</td>
                                </tr>
                            </thead>
                            <tbody className=" w-full border-separate">
                                {users.map((user) => (
                                    <TableItem
                                        key={user.id}
                                        user={user}
                                        deleteUsers={deleteUsers}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </section>
        </main>
    );
}

type TableItemProps = {
    user: User;
    deleteUsers: (id: number) => void;
};

function TableItem(props: TableItemProps) {
    const navigate = useNavigate();

    return (
        <tr className="text-center rounded-[16px] text-[18px] font-medium   h-[90px]  w-full  border-y border-white/20 ">
            <td className="relative">
                <img
                    src={props.user.image}
                    className="bg-neutral-200/50 rounded-[8px] absolute left-1/2 -translate-x-1/2 w-[70px] top-1/2 -translate-y-1/2 h-[70px]"
                    alt=""
                />
            </td>
            <td>{props.user.name}</td>
            <td>{props.user.email}</td>
            <td>
                <span className="flex divide-x-2 px-7 divide-white/50   items-center w-1/2 translate-x-1/2  bg-white/10 rounded-full text-white/50 ml-2 border justify-center  border-white/10 py-2">
                    <span className="pr-3">
                        <Eye
                            onClick={() =>
                                navigate(`/accounts/${props.user.id}`)
                            }
                            className=" transition-all  hover:stroke-blue-400 hover:cursor-pointer  hover:scale-110"
                        />{" "}
                    </span>
                    <span
                        onClick={() => props.deleteUsers(props.user.id)}
                        className="pl-5">
                        <Trash2 className="transition-all hover:stroke-red-400 hover:cursor-pointer hover:scale-110" />
                    </span>
                </span>
            </td>
        </tr>
    );
}
