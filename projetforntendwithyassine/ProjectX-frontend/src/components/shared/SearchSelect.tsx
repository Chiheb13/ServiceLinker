import { useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";

export default function SearchSelect({ allItems }: { allItems: string[] }) {
    const [visibleItems, setVisibleItems] = useState<string[]>(allItems);
    const [selectedItems, setSelectedItems] = useState<string[]>(allItems);
    const [searchValue, setSearchValue] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setSearchValue(value);
        setVisibleItems(
            value ? allItems.filter((item) => item.includes(value)) : allItems
        );
    };

    const stopSearching = (): void => {
        setIsSearching(false);
        setSearchValue("");
        setVisibleItems(allItems);
    };

    const selectOneItem = (item: string): void => {
        if (!selectedItems.includes(item)) {
            setSelectedItems((prev) => [...prev, item]);
        }
        stopSearching();
    };

    const removeOne = (item: string): void => {
        setSelectedItems((prev) => prev.filter((x) => x !== item));
    };

    const removeAll = (): void => {
        setSelectedItems([]);
    };

    return (
        <div className="relative">
            <SearchInput
                value={searchValue}
                onChange={handleSearch}
                onFocus={() => setIsSearching(true)}
            />
            {isSearching && (
                <SelectableList
                    items={visibleItems}
                    onSelectItem={selectOneItem}
                />
            )}
            <SelectedList
                items={selectedItems}
                onRemove={removeOne}
                onRemoveAll={removeAll}
            />
            {isSearching &&
                createPortal(
                    <Overlay onClick={stopSearching} />,
                    document.body
                )}
        </div>
    );
}

// Helper components
function SelectedList({
    items,
    onRemove,
    onRemoveAll,
}: {
    items: string[];
    onRemove: (item: string) => void;
    onRemoveAll: () => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {items.map((item) => (
                <SelectedItem key={item} item={item} onRemove={onRemove} />
            ))}
            {items.length > 0 && (
                <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={onRemoveAll}>
                    Remove All
                </button>
            )}
        </div>
    );
}

function SearchInput({
    value,
    onChange,
    onFocus,
}: {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus: () => void;
}) {
    return (
        <input
            placeholder="Search here..."
            onChange={onChange}
            onFocus={onFocus}
            type="text"
            value={value}
            className="border p-2 rounded w-full"
        />
    );
}

function SelectableList({
    items,
    onSelectItem,
}: {
    items: string[];
    onSelectItem: (item: string) => void;
}) {
    return (
        <div className="absolute bg-white text-black w-full border rounded shadow-lg max-h-60 overflow-auto z-10">
            {items.map((item) => (
                <div
                    tabIndex={0}
                    role="button"
                    key={item}
                    onClick={() => onSelectItem(item)}
                    className="p-2 hover:bg-gray-100 cursor-pointer">
                    {item}
                </div>
            ))}
        </div>
    );
}

function SelectedItem({
    item,
    onRemove,
}: {
    item: string;
    onRemove: (item: string) => void;
}) {
    return (
        <div className="flex items-center bg-blue-500 text-white p-2 rounded gap-2">
            {item}
            <button
                className="bg-red-600 rounded p-1"
                onClick={() => onRemove(item)}>
                Remove
            </button>
        </div>
    );
}

function Overlay({ onClick }: { onClick: () => void }) {
    return (
        <div
            className="fixed inset-0 bg-black opacity-25"
            onClick={onClick}></div>
    );
}
