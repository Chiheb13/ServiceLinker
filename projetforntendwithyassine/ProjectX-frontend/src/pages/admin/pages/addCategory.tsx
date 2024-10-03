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
import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "sonner";

// name /  desc / image / status
export default function AddCategory() {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("offline");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<Blob>();

    const handleSave = async () => {
        const formData = new FormData();
        formData.append("name", name);
         formData.append("status", status);
        console.log(formData);
        formData.append("description", description);
        if (image) formData.append("image", image);
       
        try {
            const response = await axios.post(
                "http://localhost:8000/addCategory",
                formData,
                { withCredentials: true, withXSRFToken: true }
            );
            if (response.status == 201) toast.success("created ! ");
            else toast.error("error while saving ..");
        } catch (error) {
            toast.error("error while u are saving ");
        }
    };

    return (
        <main className="bg-[#1A1A1A] min-h-[100vh] flex  text-white">
            <Toaster richColors theme="dark" />
            <SideNav selectedPage="categories" className="w-[450px] " />
            <section className="w-full ">
                <TopBar />
                <h1 className="mt-10 px-[50px] text-[32px] font-medium underline underline-offset-8">
                    Add category
                </h1>
                <section className="flex items-center  gap-10  mt-[70px] px-[50px]">
                    <section className="px-[50px] w-[40%]   h-full">
                        <AddCategoryImage setImage={setImage} />
                    </section>
                    <section className="flex flex-col gap-8 h-full  w-[60%]">
                        <div>
                            <Label
                                className="text-[20px] font-normal"
                                htmlFor="name">
                                Name
                            </Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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

                            <Select
                                defaultValue="active"
                                onValueChange={(val) => setStatus(val)}>
                                <SelectTrigger className="bg-black/5 placeholder:text-neutral-500 text-[18px] h-[55px] rounded-[4px] border-white/20 mt-2">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="offline">
                                        Offline
                                    </SelectItem>
                                    <SelectItem value="online">
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
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Type a description for your service"
                                id="description"
                                className="w-full text-[18px] mt-2 h-[150px] bg-black/5 border p-3 placeholder:text-neutral-500  placeholder:opacity-70 border-white/20"
                            />
                        </div>
                        <Button
                            onClick={handleSave}
                            className="bg-white text-[20px] transition-all font-semibold active:scale-95 hover:bg-black/20 ease-in border border-white/20 hover:text-white rounded-[6px] h-[50px] mt-auto text-black">
                            Add category
                        </Button>
                    </section>
                </section>
            </section>
        </main>
    );
}
