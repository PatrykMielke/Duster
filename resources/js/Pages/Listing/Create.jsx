import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CreateListing({ users, statuses, colors, sizes, brands, materials, conditions, items, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        price: "",
        user_id: auth.user.id, // Use authenticated user ID directly
        status_id: statuses[0]?.id || "",
        condition_id: "",
        item_id: "",
        color_ids: [],
        size_id: sizes[0]?.id || "",
        brand_id: brands[0]?.id || "",
        material_ids: [],
        images: []
    });
    const [imagePreviews, setImagePreviews] = useState([]);

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("user_id", data.user_id); // This will now have the authenticated user's ID
        formData.append("status_id", data.status_id);
        formData.append("condition_id", data.condition_id);
        formData.append("item_id", data.item_id);
        formData.append("size_id", data.size_id);
        formData.append("brand_id", data.brand_id);

        data.color_ids.forEach((colorId) => formData.append("color_ids[]", colorId));
        data.material_ids.forEach((materialId) => formData.append("material_ids[]", materialId));

        Array.from(data.images).forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        post(route("listings.store"), {
            data: formData,
            onFinish: () => reset(),
            forceFormData: true,
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData("images", files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const handleColorChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setData("color_ids", selectedOptions);
    };

    const handleMaterialChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setData("material_ids", selectedOptions);
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
                                onChange={(e) => setData("price", e.target.value)}
                                required
                            />
                            <InputError message={errors.price} className="mt-2" />
                        </div>



                        {/* Status Selection */}
                        <div className="mt-4">
                            <InputLabel htmlFor="status_id" value="Status" />
                            <select
                                id="status_id"
                                name="status_id"
                                value={data.status_id}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData("status_id", e.target.value)}
                                required
                            >
                                {statuses.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.status_id} className="mt-2" />
                        </div>

                        {/* Condition Selection */}
                        <div className="mt-4">
                            <InputLabel htmlFor="condition_id" value="Stan" />
                            <select
                                id="condition_id"
                                name="condition_id"
                                value={data.condition_id}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData("condition_id", e.target.value)}
                                required
                            >
                                <option value="">Wybierz stan</option>
                                {conditions.map((condition) => (
                                    <option key={condition.id} value={condition.id}>
                                        {condition.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.condition_id} className="mt-2" />
                        </div>

                        {/* Item Selection */}
                        <div className="mt-4">
                            <InputLabel htmlFor="item_id" value="Przedmiot" />
                            <select
                                id="item_id"
                                name="item_id"
                                value={data.item_id}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData("item_id", e.target.value)}
                                required
                            >
                                <option value="">Wybierz przedmiot</option>
                                {items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.item_id} className="mt-2" />
                        </div>

                        {/* Color Selection */}
                        <div className="mt-4">
                            <InputLabel htmlFor="color_ids" value="Kolory" />
                            <select
                                id="color_ids"
                                name="color_ids"
                                multiple
                                value={data.color_ids}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={handleColorChange}
                                required
                            >
                                {colors.map((color) => (
                                    <option key={color.id} value={color.id}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.color_ids} className="mt-2" />
                        </div>

                        {/* Size Selection */}
                        <div className="mt-4">
                            <InputLabel htmlFor="size_id" value="Rozmiar" />
                            <select
                                id="size_id"
                                name="size_id"
                                value={data.size_id}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData("size_id", e.target.value)}
                                required
                            >
                                {sizes.map((size) => (
                                    <option key={size.id} value={size.id}>
                                        {size.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.size_id} className="mt-2" />
                        </div>

                        {/* Brand Selection */}
                        <div className="mt-4">
                            <InputLabel htmlFor="brand_id" value="Marka" />
                            <select
                                id="brand_id"
                                name="brand_id"
                                value={data.brand_id}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={(e) => setData("brand_id", e.target.value)}
                                required
                            >
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.brand_id} className="mt-2" />
                        </div>

                        {/* Material Selection */}
                        <div className="mt-4">
                            <InputLabel htmlFor="material_ids" value="Materiały" />
                            <select
                                id="material_ids"
                                name="material_ids"
                                multiple
                                value={data.material_ids}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={handleMaterialChange}
                                required
                            >
                                {materials.map((material) => (
                                    <option key={material.id} value={material.id}>
                                        {material.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.material_ids} className="mt-2" />
                        </div>

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
                                <img key={index} src={src} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded" />
                            ))}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 flex items-center justify-end">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Dodaj ogłoszenie
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
