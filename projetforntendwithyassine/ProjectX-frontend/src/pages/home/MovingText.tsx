import { useEffect } from "react";
//@ts-ignore
import Typewriter from "typewriter-effect/dist/core";

export default function MovingText() {
    useEffect(() => {
        new Typewriter("#typewriter", {
            strings: ["Sevice1...", "Srvice2..."],
            autoStart: true,
            loop: true,
        });
    }, []);
    return (
        <h1
            id=""
            className="mt-[120px] font-semibold text-[56px] w-full text-center">
            Look for{" "}
            <span id="typewriter" className="font-bold text-[#ea7649]"></span>
        </h1>
    );
}
