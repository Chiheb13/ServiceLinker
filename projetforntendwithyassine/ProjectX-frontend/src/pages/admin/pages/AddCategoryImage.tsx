import { Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";

type Props = {
    setImage: any;
};

export default function AddCategoryImage(props: Props) {
    const [previewUrl, setPreviewUrl] = useState("");

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        props.setImage(file);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        if (file) setPreviewUrl(URL.createObjectURL(file));
    };

    return (
        <div
            style={{ backgroundImage: `url(${previewUrl})` }}
            className="border  relative bg-cover  bg-center h-[400px]  border-neutral-400/40 hover:bg-black/20 active:bg-black/10 hover:cursor-pointer transition-colors bg-black/30 flex items-center justify-center rounded-[8px] flex-1 ">
            {!previewUrl && (
                <Plus className="w-[100px] opacity-30  h-[100px]" />
            )}
            <input
                onChange={handleImageChange}
                type="file"
                accept="image/png image/jpg image/jpeg"
                className="opacity-0 w-full absolute h-full top-0 right-0"
            />
        </div>
    );
}
