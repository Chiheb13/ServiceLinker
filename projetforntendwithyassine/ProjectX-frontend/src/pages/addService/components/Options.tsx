import CategorySelect from "./CategorySelect";
import TypeSelect from "./TypeSelect";

type Props = {
    setServiceType: (type: string) => void;
    setServiceCategory: (category: string) => void;
    selectedCategory: string;
};
0;

export default function Options(props: Props) {
    return (
        <div className="h-[320px] py-8 px-10 mt-5 bg-black/30  border rounded-[8px] border-neutral-400/40  w-full ">
            <TypeSelect setType={props.setServiceType} />
            <CategorySelect
                selectedCategory={props.selectedCategory}
                setCategory={props.setServiceCategory}
            />
        </div>
    );
}
