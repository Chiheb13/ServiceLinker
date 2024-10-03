import NegativeChart from "@/components/svg/NegativeChart";
import PositiveChart from "@/components/svg/PosiveChart";

type Props = {
    data: string;
    title: string;
    isPositive: boolean;
};

export default function DataCard(props: Props) {
    return (
        <div className="border relative p-8 border-white/20 rounded-[16px] hover:bg-black/25 transition-colors h-[180px]">
            
            <p className="text-[18px] font-normal">{props.title}</p>
            <p className="text-[44px] font-medium">{props.data}</p>
            {props.isPositive ? (
                <PositiveChart className="absolute right-[35px] scale-150 top-[105px]" />
            ) : (
                <NegativeChart className="absolute right-[35px] scale-150 top-[105px]" />
            )}
        </div>
    );
}
