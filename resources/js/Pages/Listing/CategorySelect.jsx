import React, { useState } from "react";

const CategorySelector = ({ categories_hierarchy }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        const category = categories_hierarchy.original.categories.find((cat) => cat.id === categoryId);
        setSelectedCategory(category);
        setSelectedSection(null);
        setSelectedItem(null);
    };

    const handleSectionChange = (e) => {
        const sectionId = e.target.value;
        const section = selectedCategory.sections.find((sec) => sec.id === sectionId);
        setSelectedSection(section);
        setSelectedItem(null);
    };

    const handleItemChange = (e) => {
        const itemId = e.target.value;
        const item = selectedSection.items.find((item) => item.category_id.toString() === itemId);
        setSelectedItem(item);
    };

    return (
        <div>
            {/* Select dla kategorii głównych */}
            <div>
                <label>Kategoria główna:</label>
                <select onChange={handleCategoryChange} value={selectedCategory?.id || ""}>
                    <option value="">-- Wybierz kategorię --</option>
                    {categories_hierarchy.original.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Select dla sekcji (jeśli wybrano kategorię) */}
            {selectedCategory && (
                <div>
                    <label>Sekcja:</label>
                    <select onChange={handleSectionChange} value={selectedSection?.id || ""}>
                        <option value="">-- Wybierz sekcję --</option>
                        {selectedCategory.sections.map((section) => (
                            <option key={section.id} value={section.id}>
                                {section.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Select dla elementów (jeśli wybrano sekcję) */}
            {selectedSection && (
                <div>
                    <label>Element:</label>
                    <select onChange={handleItemChange} value={selectedItem?.category_id || ""}>
                        <option value="">-- Wybierz element --</option>
                        {selectedSection.items.map((item) => (
                            <option key={item.category_id} value={item.category_id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Wyświetlenie wyborów */}
            <div>
                <h3>Twój wybór:</h3>
                <p>Kategoria: {selectedCategory?.name || "Brak"}</p>
                <p>Sekcja: {selectedSection?.name || "Brak"}</p>
                <p>Element: {selectedItem?.name || "Brak"}</p>
            </div>
        </div>
    );
};

export default CategorySelector;
