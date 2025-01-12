import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import MultiSelectDropdown from "@/Pages/Listing/Partials/MultiSelectDropdown";
import SingleSelectDropdown from "@/Pages/Listing/Partials/SingleSelectDropdown";
import CategorySelector from "@/Pages/Listing/CategorySelect"; // Import CategorySelector
import Layout from "@/Layouts/Layout";
import SecondaryButton from "@/Components/SecondaryButton";
import { DataArray } from "@mui/icons-material";

const Edit = ({ listing, conditions = [], colors = [], sizes = [], brands = [], materials = [], category_id, gallery = [], categories_hierarchy, breadcrumbs }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        user_id: listing.user_id,
        condition_id: listing.details?.condition_id,
        color_ids: listing.details?.detail_color?.map(color => color.color_id) || [],
        size_id: listing.details?.size_id,
        brand_id: listing.details?.brand_id,
        material_ids: listing.details?.detail_material?.map(material => material.material_id) || [],
        images: listing.galleries.map(gallery => gallery.image) || [],
        category_id: listing.details?.category_id,
    });
    const [imagePreviews, setImagePreviews] = useState([]);
    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("user_id", data.user_id);
        formData.append("condition_id", data.condition_id);
        formData.append("size_id", data.size_id);
        formData.append("brand_id", data.brand_id);
        formData.append("category_id", data.category_id);

        // Dodanie kolorów i materiałów
        data.color_ids.forEach((colorId) => formData.append("color_ids[]", colorId));
        data.material_ids.forEach((materialId) => formData.append("material_ids[]", materialId));

        // Dodanie starych zdjęć (ścieżki do zdjęć)
        listing.galleries.forEach((gallery) => {
            formData.append("existing_images[]", gallery.image); // Przesyłamy istniejące zdjęcia jako ścieżki
        });

        // Dodanie nowych zdjęć (w formie obiektów File)
        if (data.images && data.images.length > 0) {
            data.images.forEach((image) => {
                if (image instanceof File) {
                    formData.append("images[]", image); // Dodajemy obraz jako plik
                }
            });
        }

        console.log("FormData wysyłane do backendu:", data);
        post(route('listings.update', listing.id), {
            data: formData,
            forceFormData: true,
            onSuccess: () => {
                console.log("Dane zostały przesłane pomyślnie!");
            },
            onError: (errors) => {
                console.error("Błąd podczas przesyłania danych:", errors);
            },
        });
    };
    useEffect(() => {
        const previews = listing.galleries.map((gallery) => {
            return `${window.location.origin}${gallery.image}`; // Dodaj domenę do ścieżki
        });
        setImagePreviews(previews);
    }, [listing.galleries]);

    const removeImage = (index) => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews.splice(index, 1);
        setImagePreviews(updatedPreviews);

        const updatedImages = [...data.images];
        updatedImages.splice(index, 1);
        setData("images", updatedImages);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData("images", [...data.images, ...files]); // Dodanie nowych zdjęć do starych

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews([...imagePreviews, ...previews]); // Dodanie nowych podglądów
    };


    const handleChildData = (data) => {
        console.log(data)
        setData("category_id", data);
    };

    const cancelAction = () => {
        window.history.back();
    };

    return (
        <Layout>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Head title="Dodaj nowe ogłoszenie" />
                    <form onSubmit={submit}>

                        {/* Title Field */}
                        <div>
                            <InputLabel htmlFor="title" value="Tytuł" />
                            <TextInput
                                id="title"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                onChange={(e) => setData("title", e.target.value)}
                                required
                            />
                            <InputError message={errors.title} className="mt-2" />
                        </div>

                        {/* Description Field */}
                        <div className="mt-4">
                            <InputLabel htmlFor="description" value="Opis" />
                            <textarea
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full h-32 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData("description", e.target.value)}
                                required
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>

                        {/* Price Field */}
                        <div className="mt-4">
                            <InputLabel htmlFor="price" value="Cena" />
                            <TextInput
                                id="price"
                                type="number"
                                name="price"
                                value={data.price}
                                className="mt-1 block w-full"
                                onChange={(e) => {
                                    const value = e.target.value;

                                    const regex = /^\d{1,8}(\.\d{0,2})?$/;

                                    if (regex.test(value)) {
                                        setData("price", value);
                                    }
                                }}
                                max="99999999.99"
                                step="0.01"
                                required
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>


                        {/* Category Field */}
                        <CategorySelector
                            breadcrumbs={breadcrumbs}
                            categories_hierarchy={categories_hierarchy}
                            setDataa={handleChildData}
                        />

                        {/* Condition Selection */}
                        <SingleSelectDropdown
                            label="Stan"
                            options={conditions}
                            selectedOption={data.condition_id}
                            onChange={(selectedId) => setData("condition_id", selectedId)}
                            errorMessage={errors.condition_id}
                        />


                        {/* Color Selection */}
                        <MultiSelectDropdown
                            label="Kolory"
                            options={colors}
                            selectedOptions={data.color_ids}
                            onChange={(selectedColors) => setData("color_ids", selectedColors)}
                            errorMessage={errors.color_ids}
                        />

                        {/* Size Selection */}
                        <SingleSelectDropdown
                            label="Rozmiar"
                            options={sizes}
                            selectedOption={data.size_id}
                            onChange={(selectedId) => setData("size_id", selectedId)}
                            errorMessage={errors.size_id}
                        />

                        {/* Brand Selection */}
                        <SingleSelectDropdown
                            label="Marka"
                            options={brands}
                            selectedOption={data.brand_id}
                            onChange={(selectedId) => setData("brand_id", selectedId)}
                            errorMessage={errors.brand_id}
                        />

                        {/* Material Selection */}
                        <MultiSelectDropdown
                            label="Materiał"
                            options={materials}
                            selectedOptions={data.material_ids}
                            onChange={(selectedMaterials) => setData("material_ids", selectedMaterials)}
                            errorMessage={errors.material_ids}
                        />

                        {/* Images Field */}
                        <div className="mt-4">
                            <InputLabel htmlFor="images" value="Zdjęcia" />
                            <input
                                type="file"
                                id="images"
                                name="images"
                                multiple
                                onChange={handleFileChange}
                                className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
                            <InputError message={errors.images} className="mt-2" />
                        </div>

                        <div className="mt-2 flex space-x-4">
                            {imagePreviews.map((src, index) => (
                                <div key={index} className="relative">
                                    <img src={src} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)} // Logika usuwania zdjęcia
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 flex items-center justify-between">
                            {/* Cancel Button */}
                            <SecondaryButton
                                onClick={cancelAction}
                            >
                                Anuluj
                            </SecondaryButton>

                            <PrimaryButton className="ms-4" disabled={processing}>
                                Dodaj ogłoszenie
                            </PrimaryButton>


                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Edit;
