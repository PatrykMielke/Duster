import React, { useState, useEffect } from "react";
import SingleSelectDropdown from "@/Pages/Listing/Partials/SingleSelectDropdown";

const CategorySelector = ({ categories_hierarchy, setDataa, breadcrumbs }) => {
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedSection, setSelectedSection] = useState();
    const [selectedItem, setSelectedItem] = useState();

    const defaultChoice = breadcrumbs ? {
        sex: { id: breadcrumbs[0].id, name: breadcrumbs[0].name.toLowerCase() },
        item: { id: breadcrumbs[1].id, name: breadcrumbs[1].name.toLowerCase() },
        cat: { id: breadcrumbs[2].id, name: breadcrumbs[2].name.toLowerCase() },
    } : null;

    const handleCategoryChange = (categoryId) => {
        const category = categories_hierarchy.original.categories.find((cat) => cat.id === categoryId);
        setSelectedCategory(category);
        setSelectedSection(null);
        setSelectedItem(null);
        setDataa("category_id", null);

    };

    const handleSectionChange = (sectionId) => {
        const section = selectedCategory.sections.find((sec) => sec.id === sectionId);
        setSelectedSection(section);
        setSelectedItem(null);
        setDataa("category_id", null);
    };

    const handleItemChange = (categoryId) => {
        const item = selectedSection.items.find((item) => item.category_id === categoryId);
        setSelectedItem(item);
        setDataa("category_id", categoryId);  // Update the form's category_id field
    };

    useEffect(() => {
        if (!defaultChoice) return;
        if (defaultChoice.sex) {
            const category = categories_hierarchy.original.categories.find(
                (cat) => cat.id === defaultChoice.sex.name
            );
            setSelectedCategory(category);

            if (category) {
                const section = category.sections.find(
                    (sec) => sec.id === defaultChoice.item.name
                );
                setSelectedSection(section);

                if (section) {
                    const item = section.items.find(
                        (item) => item.category_id === defaultChoice.cat.id
                    );
                    setSelectedItem(item);
                }
            }
        }
    }, []);


    return (
        <div className="space-y-4">
            <SingleSelectDropdown
                label="Kategoria główna"
                options={categories_hierarchy.original.categories}
                selectedOption={selectedCategory?.id}
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
                <SingleSelectDropdown
                    label="Element"
                    options={selectedSection.items.map((item) => ({ id: item.category_id, name: item.name }))}
                    selectedOption={selectedItem?.category_id || ""}
                    onChange={handleItemChange}
                    errorMessage={null}
                />
            )}
        </div>
    );
};

export default CategorySelector;
