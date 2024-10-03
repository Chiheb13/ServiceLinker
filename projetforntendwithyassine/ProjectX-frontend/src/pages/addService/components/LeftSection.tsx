import { AddServiceData } from "../AddService";
import ImageUpload from "./ImageUpload";
import Options from "./Options";

type Props = {
    setData: React.Dispatch<React.SetStateAction<AddServiceData>>;
    data: AddServiceData;
};

export default function LeftSection({ data, setData }: Props) {
    const setImage = (image: any) => setData({ ...data, image });

    const setServiceType = (type: string) => setData({ ...data, type });
    const setServiceCategory = (category: string) =>
        setData({ ...data, category });

    return (
        <section className="w-[40%] flex flex-col h-[76vh] ">
            <ImageUpload setImage={setImage} />
            <Options
                setServiceCategory={setServiceCategory}
                setServiceType={setServiceType}
                selectedCategory={data.category}
            />
        </section>
    );
}
