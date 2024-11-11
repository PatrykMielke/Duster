import React, { useState, useEffect } from "react";

// Sample controller function to simulate API call
// Replace this with actual API request to fetch data for second select
const fetchDataForSecondSelect = async (selectedValue) => {
    // Simulate API response based on the selected value
    const data = {
        option1: [
            { id: "1a", name: "Suboption 1A" },
            { id: "1b", name: "Suboption 1B" },
        ],
        option2: [
            { id: "2a", name: "Suboption 2A" },
            { id: "2b", name: "Suboption 2B" },
        ],
        option3: [
            { id: "3a", name: "Suboption 3A" },
            { id: "3b", name: "Suboption 3B" },
        ],
    };
    return data[selectedValue] || [];
};

const DynamicSelect = () => {
    const [primaryOptions] = useState([
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ]);

    const [selectedPrimary, setSelectedPrimary] = useState("");
    const [secondaryOptions, setSecondaryOptions] = useState([]);
    const [selectedSecondary, setSelectedSecondary] = useState("");

    const handlePrimaryChange = async (e) => {
        const selectedValue = e.target.value;
        setSelectedPrimary(selectedValue);
        setSelectedSecondary(""); // Reset secondary selection

        // Fetch secondary options from controller
        const options = await fetchDataForSecondSelect(selectedValue);
        setSecondaryOptions(options);
    };

    return (
        <div>
            <label>
                Primary Select:
                <select value={selectedPrimary} onChange={handlePrimaryChange}>
                    <option value="">Select an option</option>
                    {primaryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>

            {secondaryOptions.length > 0 && (
                <label style={{ marginTop: "10px", display: "block" }}>
                    Secondary Select:
                    <select
                        value={selectedSecondary}
                        onChange={(e) => setSelectedSecondary(e.target.value)}
                    >
                        <option value="">Select a suboption</option>
                        {secondaryOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </label>
            )}
        </div>
    );
};

export default DynamicSelect;
