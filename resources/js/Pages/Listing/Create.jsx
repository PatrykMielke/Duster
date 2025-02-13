import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";
import MultiSelectDropdown from "@/Pages/Listing/Partials/MultiSelectDropdown";
import SingleSelectDropdown from "@/Pages/Listing/Partials/SingleSelectDropdown";
import CategorySelector from "@/Pages/Listing/CategorySelect";
import SecondaryButton from "@/Components/SecondaryButton";


export default function CreateListing({ colors, sizes, brands, materials, conditions, auth, categories_hierarchy }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        price: "",
        user_id: auth.user.id,
        condition_id: "",
        color_ids: [],
        size_id: "",
        brand_id: "",
        material_ids: [],
        images: [],
        category_id: "",
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

        data.color_ids.forEach((colorId) => formData.append("color_ids[]", colorId));
        data.material_ids.forEach((materialId) => formData.append("material_ids[]", materialId));

        Array.from(data.images).forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        console.log(data, "data")
        post(route("listings.store"), {
            data: formData,
            forceFormData: true,
        });

    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setData("images", files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
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
                                <img key={index} src={src} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded" />
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
}
