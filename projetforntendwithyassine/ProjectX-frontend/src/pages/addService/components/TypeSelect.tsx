import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type Props = {
    setType: (type: string) => void;
};

export default function TypeSelect({ setType }: Props) {
    return (
        <>
            <p className="text-xl  ">Service type : </p>
            <Select defaultValue="online" onValueChange={(val) => setType(val)}>
                <SelectTrigger className="mt-3 focus:ring-white/20 focus:ring-offset-0 rounded-sm bg-white/5 border-white/20 h-[50px]  text-[16px] font-medium">
                    <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-0 rounded-none text-white">
                    <SelectItem
                        className="focus:bg-neutral-200 h-[45px] rounded-[2px] text-[16px]"
                        value="online">
                        Online
                    </SelectItem>
                    <SelectItem
                        className="focus:bg-neutral-200 h-[45px] rounded-[2px] text-[16px]"
                        value="offline">
                        Offline
                    </SelectItem>
                </SelectContent>
            </Select>
        </>
    );
}
