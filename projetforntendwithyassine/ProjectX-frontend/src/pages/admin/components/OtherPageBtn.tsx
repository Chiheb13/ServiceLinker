import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
    icon: LucideIcon;
    text: string;
    route: string;
};

export default function OtherPageBtn(props: Props) {
    const Icon = props.icon;
    return (
        <Link
            to={props.route}
            className="h-[300px] hover:bg-white/5 transition-colors hover:cursor-pointer  items-center flex gap-3 justify-center border-white/10 text-[26px] border rounded-xl">
            <Icon className="scale-[115%]" />
            {props.text}
        </Link>
    );
}
