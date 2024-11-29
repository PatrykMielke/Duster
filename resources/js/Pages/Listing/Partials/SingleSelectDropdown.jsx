import { useState, useRef, useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function SingleSelectDropdown({
    label,
    options,
    selectedOption,
    onChange,
    errorMessage,
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleOptionSelect = (optionId) => {
        setDropdownOpen(false);
        onChange(optionId);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="mt-4 relative" ref={dropdownRef}>
            <InputLabel value={label} />
            <div
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 cursor-pointer focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                {selectedOption ? (
                    <span className="text-gray-800">
                        {options.find(option => option.id === selectedOption)?.name}
                    </span>
                ) : (
                    <span className="text-gray-400">Wybierz {label.toLowerCase()}</span>
                )}
            </div>
            {dropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`flex items-center px-3 py-2 cursor-pointer ${selectedOption === option.id
                                ? 'bg-indigo-100 text-indigo-600'
                                : 'text-gray-700'
                                } hover:bg-indigo-50`}
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            <span className="ml-2">{option.name}</span>
                        </div>
                    ))}
                </div>
            )}
            <InputError message={errorMessage} className="mt-2" />
        </div>
    );
}
