import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email?: string;
    img: string | null;
};

export default function useUserData() {
    const [authenticating, setAuthenticating] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        api.get("/user")
            .then((data) => {
                console.log(data.data);
                setAuthenticating(false);
                setUser(data?.data?.user);
            })
            .catch(() => {
                setUser(null);
                setAuthenticating(false);
            });
    }, []);

    return { user, authenticating };
}
