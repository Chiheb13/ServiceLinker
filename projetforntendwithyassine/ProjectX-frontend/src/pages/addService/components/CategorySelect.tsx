import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { api } from "@/lib/axios";
import { useEffect, useMemo, useState } from "react";

type Props = {
    setCategory: (category: string) => void;
    selectedCategory: string;
};
export default function CategorySelect({
    setCategory,
    selectedCategory,
}: Props) {
    const [categories, setCategories] = useState<any>([]);
    useEffect(() => {
        api.get("/categories").then((res) => {
            setCategory(res.data[1]?.[0]?.id?.toString());
            setCategories(res.data[1]);
        });
    }, []);

    const selectedCategoryText = useMemo(() => {
        return categories.find((c: any) => c.id == selectedCategory)?.name;
    }, [selectedCategory]);
    return (
        <>
            <p className="text-xl mt-[24px] ">Service category : </p>
            <Select defaultValue="1" onValueChange={(val) => setCategory(val)}>
                <SelectTrigger className="mt-3 focus:ring-white/20 focus:ring-offset-0 rounded-sm bg-white/5 border-white/20 h-[50px]  text-[16px] font-medium">
                    {selectedCategoryText}
                </SelectTrigger>
                <SelectContent className="bg-neutral-800  border-0 max-h-[200px]  rounded-none text-white">
                    <ScrollArea className="h-[200px] pr-2 border-red-500">
                        {categories.map((category: any) => (
                            <SelectItem
                                key={category.id}
                                className="focus:bg-neutral-200 h-[45px] rounded-[2px] text-[16px]"
                                value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </ScrollArea>
                </SelectContent>
            </Select>
        </>
    );
}
