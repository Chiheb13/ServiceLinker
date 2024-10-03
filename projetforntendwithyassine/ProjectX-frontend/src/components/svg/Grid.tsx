import { SVGAttributes } from "react";

type Props = {} & SVGAttributes<HTMLOrSVGElement>;

export default function Grid(props: Props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            role="presentation">
            <rect width="11" height="11" rx="2" fill="currentColor"></rect>
            <rect
                x="13"
                width="11"
                height="11"
                rx="2"
                fill="currentColor"></rect>
            <rect
                y="13"
                width="11"
                height="11"
                rx="2"
                fill="currentColor"></rect>
            <rect
                x="13"
                y="13"
                width="11"
                height="11"
                rx="2"
                fill="currentColor"></rect>
        </svg>
    );
}
