import Navbar from "@/components/shared/Navbar";
import LeftSection from "./components/LeftSection";
import RightSection from "./components/RightSection";
import { FormEvent, useEffect, useState } from "react";

import { z } from "zod";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/axios";
export type AddServiceData = {
    name: string;
    description: string;
    price: string;
    type: string;
    category: string;
    image: any;
};

const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string(),
    price: z.string().refine((val) => /^[0-9]+(\.[0-9]+)?$/.test(val), {
        message: "Price must be a valid number",
    }),
    type: z.string(),
    category: z.string(),
    image: z.object({}, { message: "Image is required" }).required(),
});

function validateFormData(formData: any) {
    try {
        const validatedData = formSchema.parse(formData);
        return { success: true, data: validatedData };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const validationErrors = error.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            }));
            return { success: false, errors: validationErrors };
        }
        throw error;
    }
}

export default function AddService() {
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/user")
            .then()
            .catch(() => navigate("/login"));
    }, []);
    // if (!user) navigate("/");
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        type: "online",
        category: "information technology",
        image: null,
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { success, errors } = validateFormData(data);
        if (!success) {
            const errorMsg = errors?.[0].message;
            toast.error(errorMsg);
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        if (data.image) {
            formData.append("image", data.image);
        }
        formData.append("price", data.price);
        formData.append("type", data.type);
        try {
            const response = await axios.post(
                "http://localhost:8000/api/services",
                formData,
                { withCredentials: true, withXSRFToken: true }
            );
            console.log(response);
            if (response.data) toast.success("success");
            else toast.error("error while saving the data");
        } catch (error) {
            toast.error("error while saving the data");
        }
    };

    return (
        <main className="bg-[#1A1A1A] min-h-[100vh]  text-white">
            <Navbar page="services" />
            <form
                id="addServiceForm"
                onSubmit={handleSubmit}
                className=" flex gap-16  mt-20  px-[250px]">
                <LeftSection setData={setData} data={data} />
                <RightSection setData={setData} data={data} />
            </form>
            <Toaster richColors theme="dark" />
        </main>
    );
}
