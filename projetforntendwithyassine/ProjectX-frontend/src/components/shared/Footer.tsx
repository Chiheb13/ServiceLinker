import Logo from "../Logo";

export default function Footer() {
    const socials = [
        { link: "#", name: "Facebook" },
        { link: "#", name: "Instagram" },
        { link: "#", name: "Email" },
    ];
    return (
        <footer className="h-[80px]  border-t mt-[200px] border-white/10  flex items-center px-[150px] shadow">
            <Logo className="hover:cursor-pointer hover:rotate-180 duration-300 opacity-80  hover:opacity-100 ease-in-out transition-all scale-90" />
            <p className="ml-[25px] text-[18px]">
                ProjectX - all right reserved 2024
            </p>
            <div className=" ml-auto gap-[25px] flex">
                {socials.map((item, i) => (
                    <a
                        key={i}
                        className=" border-b transition-colors border-transparent  hover:border-white/70  "
                        href={item.link}>
                        {item.name}
                    </a>
                ))}
            </div>
        </footer>
    );
}
