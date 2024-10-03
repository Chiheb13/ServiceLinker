import { Check, X } from "lucide-react";
import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface Service {
    id: number;
    image: string;
    name: string;
    price: number;
    user_id: number;
    category: string; // Change category type to string
    user_name: string;
    situation: string;
    desc: string;
}

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        axios
            .get("http://localhost:8000/waitingservices")
            .then((response) => {
                
                const serviceData = response.data.data;
                console.log('data', serviceData)
                setServices(serviceData);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error fetching services:", error);
            });
    }, []);

    const updateServiceSituation = (id: number) => {
        console.log('hello ', id)
        axios
            .put(`http://localhost:8000/updateSituation/${id}`)
            .then((res) => {
                setServices((prevServices) =>
                    prevServices.map((service) =>
                        service.id === id
                            ? { ...service, situation: "accepted" }
                            : service
                    )
                );
                toast.success("Updated Successfully");
                window.location.reload();
            })
            .catch((err) => {
                console.error("Error updating service situation:", err);
                toast.error("error while updating");
                //window.location.reload();
            });
    };

    return (
        <main className="bg-[#1A1A1A] min-h-[100vh] flex  text-white">
            <SideNav selectedPage="services" className="w-[450px] " />
            <Toaster richColors theme="dark" />
            <section className="w-full ">
                <TopBar />
                {loading ? (
                    <p className="text-center mt-10 h-[50vh] w-full flex items-center justify-center ">
                        <LoadingSpinner />
                    </p>
                ) : (
                    <section className="px-[50px]">
                        <table className="w-full  items-center mt-[100px]">
                            <thead className="w-full items-center">
                                <tr className="w-full text-center h-[80px] ">
                                    <td>Image</td>
                                    <td>Name</td>
                                    <td className="w-[200px]">Description</td>
                                    <td>Price</td>
                                    <td>Category</td>
                                    <td>User</td>
                                    <td>situation</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody className="w-full border-separate">
                            {services.map((service) => (
                                    <TableItem
                                    key={service.id} // Add key prop here
                                    service={service}
                                    updateServiceSituation={updateServiceSituation}
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
    service: Service;
    updateServiceSituation: (id: number) => void;
}

function TableItem(props: TableItemProps) {
    const [updating, setUpdating] = useState(false);

    const handleUpdateSituation = (id: number) => {
        setUpdating(true);
        props.updateServiceSituation(id);
    };

    return (
        <tr className="text-center rounded-[16px] text-[18px] font-medium   h-[90px]  w-full  border-y border-white/20 ">
            <td className="relative">
                <img
                    src={props.service.image}
                    className="bg-neutral-200/50 rounded-[8px] absolute left-1/2 -translate-x-1/2 w-[70px] top-1/2 -translate-y-1/2 h-[70px]"
                    alt=""
                />
            </td>
            <td className=" text-[15px]">{props.service.name}</td>
            <td className="w-[200px] line-clamp-2 text-center font-normal text-[14px] pt-4 ">
                {props.service.desc}
            </td>
            <td>{props.service.price}</td>
            <td className=" text-[15px]">{props.service.category}</td>
            <td className="max-w-[90px]">
                <Link
                    className="underline underline-offset-4  text-[15px]  transition-colors hover:text-blue-500"
                    to={`/accounts/${props.service.user_id}`}>
                    {props.service.user_name}
                </Link>
            </td>
            <td className=" text-[15px]">{props.service.situation}</td>
            <td>
                <span className="flex divide-x-2 divide-white/50    items-center w-1/2 translate-x-1/2  bg-white/10 rounded-full text-white/50 ml-2 border justify-center px-2 border-white/10 py-2">
                    <span className="pr-5">
                        {updating ? (
                            <span className="text-blue-500">Updating...</span>
                        ) : (
                            <Check
                                className="transition-all stroke-[4] hover:stroke-green-400 hover:cursor-pointer hover:scale-110"
                                onClick={() =>
                                    handleUpdateSituation(props.service.id)
                                }
                            />
                        )}
                    </span>
                    <span className="pl-5 ">
                        <X className="transition-all hover:stroke-red-400 stroke-[4] hover:cursor-pointer hover:scale-110" />
                    </span>
                </span>
            </td>
        </tr>
    );
}