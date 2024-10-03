import DataCard from "../components/DataCard";
import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";

export default function AdminServicesRequests() {
    return (
        <main className="bg-[#1A1A1A] min-h-[100vh] flex  text-white">
            <SideNav selectedPage="categories" className="w-[450px] " />
            <section className="w-full ">
                <TopBar />

                <section className="px-[50px] mt-20">
                    <div className="grid grid-cols-4 items-center mt-5 gap-8">
                        <DataCard
                            data="700"
                            isPositive={true}
                            title="Visits last week"
                        />
                        <DataCard
                            data="10"
                            isPositive={true}
                            title="Categories in total"
                        />
                        <DataCard
                            data="70"
                            isPositive={false}
                            title="Service in total"
                        />
                        <DataCard
                            data="500"
                            isPositive={true}
                            title="New user from last week"
                        />
                    </div>
                </section>
                <section className=" gap-10  px-[50px] mt-20">
                    TODO here the admin will be able to see the services
                    requests, he will accept or refuse the request.
                </section>
            </section>
        </main>
    );
}
