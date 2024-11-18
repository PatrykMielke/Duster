import React, { useState } from "react";
import SingleSelectDropdown from "@/Pages/Listing/Partials/SingleSelectDropdown";

const CategorySelector = ({ categories_hierarchy, setDataa }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCategoryChange = (categoryId) => {
        const category = categories_hierarchy.original.categories.find((cat) => cat.id === categoryId);
        setSelectedCategory(category);
        setSelectedSection(null);
        setSelectedItem(null);
        setDataa(null);
    };

    const handleSectionChange = (sectionId) => {
        const section = selectedCategory.sections.find((sec) => sec.id === sectionId);
        setSelectedSection(section);
        setSelectedItem(null);
        setDataa(null);
    };

    const handleItemChange = (categoryId) => {
        const item = selectedSection.items.find((item) => item.category_id === categoryId);
        setSelectedItem(item);
        setDataa(null);
        setDataa(item.category_id);
    };

    return (
        <div className="space-y-4">
            <SingleSelectDropdown
                label="Kategoria główna"
                options={categories_hierarchy.original.categories}
                selectedOption={selectedCategory?.id || ""}
                onChange={handleCategoryChange}
                errorMessage={null}
            />

            {selectedCategory && (
                <SingleSelectDropdown
                    label="Sekcja"
                    options={selectedCategory.sections}
                    selectedOption={selectedSection?.id || ""}
                    onChange={handleSectionChange}
                    errorMessage={null}
                />
            )}

            {selectedSection && (
                <>
                    <SingleSelectDropdown
                        label="Element"
                        options={selectedSection.items.map((item) => ({ id: item.category_id, name: item.name }))}
                        selectedOption={selectedItem?.category_id || ""}
                        onChange={handleItemChange}
                        errorMessage={null}
                    />
                </>
            )}


        </div>
    );
}
export default CategorySelector;
