import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddServiceData } from "../AddService";

type Props = {
    setData: React.Dispatch<React.SetStateAction<AddServiceData>>;
    data: AddServiceData;
};

export default function RightSection({ setData, data }: Props) {
    return (
        <section className="w-[60%] flex flex-col gap-8">
            <div>
                <Label className="text-[20px] font-normal" htmlFor="name">
                    Name
                </Label>
                <Input
                    onBlur={(e) => setData({ ...data, name: e.target.value })}
                    placeholder="Type your service name"
                    type="text"
                    id="name"
                    className="bg-black/5 mt-2 text-[18px] h-[55px] rounded-[4px] border-white/20  placeholder:text-neutral-500"
                />
            </div>

            <div>
                <Label
                    className="text-[20px]  font-normal"
                    htmlFor="description">
                    Description
                </Label>
                <textarea
                    onBlur={(e) =>
                        setData({ ...data, description: e.target.value })
                    }
                    placeholder="Type a description for your service"
                    id="description"
                    className="w-full text-[18px] mt-2 h-[150px] bg-black/5 border p-3 placeholder:text-neutral-500  placeholder:opacity-70 border-white/20"
                />
            </div>

            <div>
                <Label className="text-[20px]  font-normal" htmlFor="price">
                    Price
                </Label>
                <Input
                    onBlur={(e) => setData({ ...data, price: e.target.value })}
                    placeholder="Type a price for your service"
                    className="bg-black/5 placeholder:text-neutral-500 text-[18px] h-[55px] rounded-[4px] border-white/20 mt-2"
                    type="text"
                    id="price"
                />
            </div>

    
            <Button
                form="addServiceForm"
                className="bg-white text-[20px] transition-all font-semibold active:scale-95 hover:bg-black/20 ease-in border border-white/20 hover:text-white rounded-[6px] h-[50px] mt-auto text-black">
                Add service
            </Button>
        </section>
    );
}
