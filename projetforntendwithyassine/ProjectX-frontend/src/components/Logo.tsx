import { useNavigate } from "react-router-dom";

export default function Logo({ className }: { className: string }) {
    const navigate = useNavigate();
    return (
        <svg
            onClick={() => navigate("/")}
            className={className}
            width="43"
            height="43"
            viewBox="0 0 43 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect
                x="20"
                y="20"
                width="20"
                height="20"
                rx="2"
                transform="rotate(-180 20 20)"
                fill="#E45940"
            />
            <rect
                x="43"
                y="43"
                width="20"
                height="20"
                rx="2"
                transform="rotate(-180 43 43)"
                fill="#E45940"
            />
            <rect
                x="20"
                y="43"
                width="20"
                height="20"
                rx="10"
                transform="rotate(-180 20 43)"
                fill="#E45940"
            />
            <rect
                x="43"
                y="21"
                width="20"
                height="20"
                rx="10"
                transform="rotate(-180 43 21)"
                fill="#E45940"
            />
        </svg>
    );
}
