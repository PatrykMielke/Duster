// MultiSelectDropdown.jsx
import { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function MultiSelectDropdown({
    label,
    options,
    selectedOptions,
    onChange,
    errorMessage,
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleOptionToggle = (optionId) => {
        const updatedSelection = selectedOptions.includes(optionId)
            ? selectedOptions.filter((id) => id !== optionId)
            : [...selectedOptions, optionId];
        onChange(updatedSelection);
    };

    return (
        <div className="mt-4 relative ">
            <InputLabel value={label} />
            <div
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 cursor-pointer focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                {selectedOptions.length > 0 ? (
                    <div className="flex flex-wrap gap-2 ">
                        {options
                            .filter((option) => selectedOptions.includes(option.id))
                            .map((option) => (
                                <span
                                    key={option.id}
                                    className="bg-indigo-500 text-white rounded-full px-2 py-1 text-sm flex items-center"
                                >
                                    {option.name}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOptionToggle(option.id);
                                        }}
                                        className="ml-1 text-xs font-bold text-white"
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))}
                    </div>
                ) : (
                    <span className="text-gray-400">Wybierz {label.toLowerCase()}</span>
                )}
            </div>
            {dropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`flex items-center px-3 py-2 cursor-pointer ${selectedOptions.includes(option.id)
                                ? 'bg-indigo-100 text-indigo-600'
                                : 'text-gray-700'
                                } hover:bg-indigo-50`}
                            onClick={() => handleOptionToggle(option.id)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedOptions.includes(option.id)}
                                readOnly
                                className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                            <span className="ml-2">{option.name}</span>
                        </div>
                    ))}
                </div>
            )}
            <InputError message={errorMessage} className="mt-2" />
        </div>
    );
}
