import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SideNav from "../components/SideNav";
import TopBar from "../components/TopBar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AddCategoryImage from "./AddCategoryImage";

export default function EditCategory() {
    return (
        <main className="bg-[#1A1A1A] min-h-[100vh] flex  text-white">
            <SideNav selectedPage="categories" className="w-[450px] " />
            <section className="w-full ">
                <TopBar />
                <h1 className="mt-10 px-[50px] text-[32px] font-medium underline underline-offset-8">
                    Add category
                </h1>
                <section className="flex items-center  gap-10  mt-[70px] px-[50px]">
                    <section className="px-[50px] w-[40%]   h-full">
                        <AddCategoryImage />
                    </section>
                    <section className="flex flex-col gap-8 h-full  w-[60%]">
                        <div>
                            <Label
                                className="text-[20px] font-normal"
                                htmlFor="name">
                                Name
                            </Label>
                            <Input
                                placeholder="Type your service name"
                                type="text"
                                id="name"
                                className="bg-black/5 mt-2 text-[18px] h-[55px] rounded-[4px] border-white/20  placeholder:text-neutral-500"
                            />
                        </div>
                        <div>
                            <Label
                                className="text-[20px]  font-normal"
                                htmlFor="price">
                                Status
                            </Label>

                            <Select defaultValue="active">
                                <SelectTrigger className="bg-black/5 placeholder:text-neutral-500 text-[18px] h-[55px] rounded-[4px] border-white/20 mt-2">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">
                                        Offline
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                        Online
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label
                                className="text-[20px]  font-normal"
                                htmlFor="description">
                                Description
                            </Label>
                            <textarea
                                placeholder="Type a description for your service"
                                id="description"
                                className="w-full text-[18px] mt-2 h-[150px] bg-black/5 border p-3 placeholder:text-neutral-500  placeholder:opacity-70 border-white/20"
                            />
                        </div>
                        <Button className="bg-white text-[20px] transition-all font-semibold active:scale-95 hover:bg-black/20 ease-in border border-white/20 hover:text-white rounded-[6px] h-[50px] mt-auto text-black">
                            Save changes
                        </Button>
                    </section>
                </section>
            </section>
        </main>
    );
}
