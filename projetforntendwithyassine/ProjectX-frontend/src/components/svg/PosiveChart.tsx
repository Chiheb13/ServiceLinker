import { HtmlHTMLAttributes } from "react";

type Props = {} & HtmlHTMLAttributes<SVGElement>;

export default function PositiveChart(props: Props) {
    return (
        <svg
            {...props}
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.23633 14.5965C2.2833 13.3598 5.68129 9.72385 7.50924 7.75333L14.3524 11.1749L22.3361 0.910156"
                stroke="#2BC155"
                stroke-width="2"
            />
            <path
                d="M7.50924 7.75333C5.68129 9.72385 2.2833 13.3598 1.23633 14.5965H22.3361V0.910156L14.3524 11.1749L7.50924 7.75333Z"
                fill="url(#paint0_linear_1347_8417)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_1347_8417"
                    x1="11.7862"
                    y1="2.62095"
                    x2="12.6416"
                    y2="14.5965"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2BC155" stopOpacity="0.73" />
                    <stop offset="1" stopColor="#2BC155" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
}
