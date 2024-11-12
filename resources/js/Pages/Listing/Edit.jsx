import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import MultiSelectDropdown from "./Partials/MultiSelectDropdown";
import SingleSelectDropdown from "./Partials/SingleSelectDropdown";


const Edit = ({ listing, users = [], statuses = [], conditions = [], items = [], colors = [], sizes = [], brands = [], materials = [] }) => {
    const { data, setData, put, processing, errors } = useForm({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        user_id: listing.user_id,
        status_id: listing.status_id,
        condition_id: listing.details?.condition_id,
        item_id: listing.details?.item_id,
        color_ids: listing.details?.detail_color?.map(color => color.color_id) || [],
        size_id: listing.details?.size_id,
        brand_id: listing.details?.brand_id,
        material_ids: listing.details?.detail_material?.map(material => material.material_id) || [],
    });

    const [existingImages, setExistingImages] = useState(listing.galleries || []);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => formData.append(`${key}[]`, v));
            } else {
                formData.append(key, value);
            }
        });

        imagesToDelete.forEach(imageId => {
            formData.append('images_to_delete[]', imageId);
        });

        put(route('listings.update', listing.id), formData);
    };

    const handleImageRemove = (imageId) => {
        setExistingImages(existingImages.filter(image => image.id !== imageId));
        setImagesToDelete([...imagesToDelete, imageId]);
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Head title="Edytuj Ogłoszenie" />
                <h1 className="text-2xl font-bold text-center">Edytuj Ogłoszenie</h1>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                            onChange={(e) => setData("price", e.target.value)}
                            required
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>



                    {/* Status Selection */}
                    <SingleSelectDropdown
                        label="Status"
                        options={statuses}
                        selectedOption={data.status_id}
                        onChange={(selectedId) => setData("status_id", selectedId)}
                        errorMessage={errors.status_id}
                    />


                    {/* Condition Selection */}
                    <SingleSelectDropdown
                        label="Stan"
                        options={conditions}
                        selectedOption={data.condition_id}
                        onChange={(selectedId) => setData("condition_id", selectedId)}
                        errorMessage={errors.condition_id}
                    />

                    {/* Item Selection */}
                    <SingleSelectDropdown
                        label="Przedmiot"
                        options={items}
                        selectedOption={data.item_id}
                        onChange={(selectedId) => setData("item_id", selectedId)}
                        errorMessage={errors.item_id}
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

                    {/* Existing Images */}
                    {existingImages.length > 0 && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Obecne obrazy</label>
                            <div className="flex flex-wrap mt-2">
                                {existingImages.map(image => (
                                    <div key={image.id} className="relative m-2">
                                        <img
                                            src={image.image} // Assuming 'image.image' contains the URL of the image
                                            alt="Current Listing"
                                            className="h-24 w-24 object-cover border rounded shadow"
                                        />
                                        <button
                                            className="absolute right-0 top-0 bg-red-500 text-white rounded-full p-1"
                                            onClick={() => handleImageRemove(image.id)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <PrimaryButton type="submit" disabled={processing}>
                        Zapisz
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
};

export default Edit;
