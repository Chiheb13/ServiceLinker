import { HTMLAttributes } from "react";
type Props = {} & HTMLAttributes<SVGElement>;

export default function NegativeChart(props: Props) {
    return (
        <svg
            {...props}
            width="24"
            height="16"
            viewBox="0 0 24 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M22.457 14.597C21.4101 13.3603 18.0121 9.72433 16.1841 7.75382L9.34094 11.1754L1.35724 0.910645"
                stroke="#F84E4E"
                stroke-width="2"
            />
            <path
                d="M16.1841 7.75382C18.0121 9.72433 21.4101 13.3603 22.457 14.597H1.35723V0.910645L9.34094 11.1754L16.1841 7.75382Z"
                fill="url(#paint0_linear_1347_8432)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_1347_8432"
                    x1="11.9071"
                    y1="2.62144"
                    x2="11.0517"
                    y2="14.597"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#F84E4E" stopOpacity="0.73" />
                    <stop offset="1" stopColor="#F84E4E" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
}
