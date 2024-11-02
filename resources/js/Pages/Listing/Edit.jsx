import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

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
                            type="text"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            onChange={e => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    {/* Description Field */}
                    <div>
                        <InputLabel htmlFor="description" value="Opis" />
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full h-32 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            onChange={e => setData('description', e.target.value)}
                            required
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    {/* Price Field */}
                    <div>
                        <InputLabel htmlFor="price" value="Cena" />
                        <TextInput
                            id="price"
                            type="number"
                            name="price"
                            value={data.price}
                            className="mt-1 block w-full"
                            onChange={e => setData('price', e.target.value)}
                            required
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>

                    {/* User Selection */}
                    <div>
                        <InputLabel htmlFor="user_id" value="Użytkownik" />
                        <select
                            name="user_id"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={data.user_id}
                            onChange={e => setData('user_id', e.target.value)}
                            required
                            disabled
                        >
                            {users.length > 0 ? (
                                users.map(user => (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                ))
                            ) : (
                                <option value="">Brak użytkowników</option>
                            )}
                        </select>
                        <InputError message={errors.user_id} className="mt-2" />
                    </div>

                    {/* Status Selection */}
                    <div>
                        <InputLabel htmlFor="status_id" value="Status" />
                        <select
                            name="status_id"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={data.status_id}
                            onChange={e => setData('status_id', e.target.value)}
                            required
                        >
                            {statuses.length > 0 ? (
                                statuses.map(status => (
                                    <option key={status.id} value={status.id}>{status.name}</option>
                                ))
                            ) : (
                                <option value="">Brak statusów</option>
                            )}
                        </select>
                        <InputError message={errors.status_id} className="mt-2" />
                    </div>

                    {/* Condition Selection */}
                    <div>
                        <InputLabel htmlFor="condition_id" value="Stan" />
                        <select
                            name="condition_id"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={data.condition_id}
                            onChange={e => setData('condition_id', e.target.value)}
                            required
                        >
                            {conditions.length > 0 ? (
                                conditions.map(condition => (
                                    <option key={condition.id} value={condition.id}>{condition.name}</option>
                                ))
                            ) : (
                                <option value="">Brak stanów</option>
                            )}
                        </select>
                        <InputError message={errors.condition_id} className="mt-2" />
                    </div>

                    {/* Item Selection */}
                    <div>
                        <InputLabel htmlFor="item_id" value="Przedmiot" />
                        <select
                            name="item_id"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={data.item_id}
                            onChange={e => setData('item_id', e.target.value)}
                            required
                        >
                            {items.length > 0 ? (
                                items.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            ) : (
                                <option value="">Brak przedmiotów</option>
                            )}
                        </select>
                        <InputError message={errors.item_id} className="mt-2" />
                    </div>

                    {/* Color Selection */}
                    <div>
                        <InputLabel htmlFor="color_ids" value="Kolory" />
                        <select
                            name="color_ids[]"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            multiple
                            value={data.color_ids}
                            onChange={e => setData('color_ids', Array.from(e.target.selectedOptions, option => option.value))}
                            required
                        >
                            {colors.length > 0 ? (
                                colors.map(color => (
                                    <option key={color.id} value={color.id}>{color.name}</option>
                                ))
                            ) : (
                                <option value="">Brak kolorów</option>
                            )}
                        </select>
                        <InputError message={errors.color_ids} className="mt-2" />
                    </div>

                    {/* Size Selection */}
                    <div>
                        <InputLabel htmlFor="size_id" value="Rozmiar" />
                        <select
                            name="size_id"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={data.size_id}
                            onChange={e => setData('size_id', e.target.value)}
                            required
                        >
                            {sizes.length > 0 ? (
                                sizes.map(size => (
                                    <option key={size.id} value={size.id}>{size.name}</option>
                                ))
                            ) : (
                                <option value="">Brak rozmiarów</option>
                            )}
                        </select>
                        <InputError message={errors.size_id} className="mt-2" />
                    </div>

                    {/* Brand Selection */}
                    <div>
                        <InputLabel htmlFor="brand_id" value="Marka" />
                        <select
                            name="brand_id"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            value={data.brand_id}
                            onChange={e => setData('brand_id', e.target.value)}
                            required
                        >
                            {brands.length > 0 ? (
                                brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>{brand.name}</option>
                                ))
                            ) : (
                                <option value="">Brak marek</option>
                            )}
                        </select>
                        <InputError message={errors.brand_id} className="mt-2" />
                    </div>

                    {/* Material Selection */}
                    <div>
                        <InputLabel htmlFor="material_ids" value="Materiały" />
                        <select
                            name="material_ids[]"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            multiple
                            value={data.material_ids}
                            onChange={e => setData('material_ids', Array.from(e.target.selectedOptions, option => option.value))}
                            required
                        >
                            {materials.length > 0 ? (
                                materials.map(material => (
                                    <option key={material.id} value={material.id}>{material.name}</option>
                                ))
                            ) : (
                                <option value="">Brak materiałów</option>
                            )}
                        </select>
                        <InputError message={errors.material_ids} className="mt-2" />
                    </div>

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
