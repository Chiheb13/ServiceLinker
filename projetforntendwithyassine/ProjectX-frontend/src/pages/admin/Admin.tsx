import { LayoutDashboard, PlusCircle, Star, Users2 } from "lucide-react";
import DataCard from "./components/DataCard";
import OtherPageBtn from "./components/OtherPageBtn";
import SideNav from "./components/SideNav";
import TopBar from "./components/TopBar";
import axios from "axios";
import { useState,useEffect } from "react";

export default function Admin() {
    interface DashboardData {
        users: number;
        categories: number;
        services: number;
        // Add other properties if needed
    }
    
    const [dashboardData, setDashboardData] = useState<DashboardData>();


    useEffect(() => {
        axios.get("http://localhost:8000/dashboard")
            .then(response => {
                setDashboardData(response.data);
                 })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);
    return (
        <main className="bg-[#1A1A1A] min-h-[100vh] flex  text-white">
            <SideNav selectedPage="dashboard" className="w-[450px] " />
            <section className="w-full ">
                <TopBar className="" />

                <section className="px-[50px] mt-20">
                <div className="grid grid-cols-4 items-center mt-5 gap-8">
                        {dashboardData && (
                            <>
                                <DataCard
                                    
                                    isPositive={true}
                                    title="Users"
                                    data={dashboardData.users}
                                />
                                <DataCard
                                    data={dashboardData.categories}
                                    isPositive={true}
                                    title="Categories"
                                />
                                <DataCard
                                    data={dashboardData.services}
                                    isPositive={false}
                                    title="Services"
                                />
                            </>
                        )}
                    </div>
                </section>
                <section className="grid grid-cols-4 gap-10  px-[50px] mt-20">
                    <OtherPageBtn
                        icon={PlusCircle}
                        route="/admin/addCategory"
                        text="AddCategory"
                    />
                    <OtherPageBtn
                        icon={LayoutDashboard}
                        route="/admin/categories"
                        text="View categories"
                    />
                    <OtherPageBtn
                        icon={Star}
                        route="/admin/services"
                        text="View services"
                    />
                    <OtherPageBtn
                        icon={Users2}
                        route="/admin/users"
                        text="View users"
                    />
                    {/* <OtherPageBtn
                        icon={ArrowDownUpIcon}
                        route="/admin/topServices"
                        text="Top services"
                    />
                    <OtherPageBtn
                        icon={ListTodoIcon}
                        route="/admin/servicesRequests"
                        text="Services Requests"
                    /> */}
                </section>
            </section>
        </main>
    );
}
