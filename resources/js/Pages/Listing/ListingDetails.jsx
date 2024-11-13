'use client'
import ToggleFavoriteButton from './Partials/FollowButton'
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import Layout from "@/Layouts/Layout";
import Carousel from '@/Components/Carousel'
import ToggleButton from './Partials/ReportButton'
import OutlinedFlagSharpIcon from '@mui/icons-material/OutlinedFlagSharp';
import { Link } from '@inertiajs/react'
export default function Example({ listing, uniqueUserCount, auth }) {



    const formatTimeDifference = (diffInHours) => {
        if (diffInHours < 1) return 'mniej niż godzina temu';
        if (diffInHours < 24) return `${diffInHours} godziny temu`;
        if (diffInHours < 48) return 'wczoraj';
        return `${Math.floor(diffInHours / 24)} dni temu`;
    };

    const now = new Date();
    const createdAt = new Date(listing.created_at);
    const diffInMilliseconds = now - createdAt;
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));


    return (
        <Layout>
            <div className="bg-white rounded-[2rem] p-4">
                <div className="pt-0">

                    {/* nowa klasa */}
                    <div className="">

                        <div className="flex justify-between items-end w-full lg:col-span-2  lg:border-gray-200 lg:pl-8 pb-1">
                            {/* Breadcrumbs po lewej stronie */}
                            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 pb-2">
                                <ol role="list" className="flex items-end space-x-2">
                                    {product.breadcrumbs.map((breadcrumb) => (
                                        <li key={breadcrumb.id}>
                                            <div className="flex items-center">
                                                <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                                    {breadcrumb.name}
                                                </a>
                                                <svg
                                                    fill="currentColor"
                                                    width={16}
                                                    height={20}
                                                    viewBox="0 0 16 20"
                                                    aria-hidden="true"
                                                    className="h-5 w-4 text-gray-300"
                                                >
                                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                                </svg>
                                            </div>
                                        </li>
                                    ))}
                                    <li className="text-sm">
                                        <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                            {listing.title}
                                        </a>
                                    </li>
                                </ol>
                            </nav>


                        </div>



                    </div>
                    {/* Image gallery */}
                    <Carousel gallery={listing.galleries} />

                    {/* Follow button */}

                    <div className="flex justify-between items-end  w-full lg:col-span-2 lg:border-gray-200  pt-2">
                        <ToggleButton
                            label={{ active: 'Zgłoś', inactive: 'Zgłoś' }}
                            icon={<OutlinedFlagSharpIcon />}
                            color={{ active: 'error', inactive: 'rgb(107 114 128)' }}
                        />


                        <ToggleFavoriteButton listing={listing} auth={auth} />

                    </div>



                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 ">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{listing.title}</h1>
                        </div>

                        {/* Options */}



                        <div className="mt-4 lg:row-span-3 lg:mt-0">

                            {/* Profile */}
                            <div className="flex items-center space-x-4">
                                <a href={user.href}>
                                    <div className="flex -space-x-1 overflow-hidden">
                                        <img
                                            alt="User profile"
                                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            className="inline-block h-12 w-12 rounded-full ring-1 ring-white "
                                        />
                                    </div>
                                </a>
                                {/* Username next to the profile picture */}
                                <div>
                                    <a href={user.href} className="text-lg font-medium text-gray-900">{listing.user.name} </a>
                                    <p className="text-sm text-gray-500">  Konto utworzono {new Date(listing.user.created_at).toLocaleDateString('pl-PL', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</p>
                                </div>
                            </div>


                            {/* Reviews */}
                            <div className="mt-3">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                aria-hidden="true"
                                                className={classNames(
                                                    reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0',
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        {reviews.totalCount} reviews
                                    </a>

                                </div>
                            </div>

                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900 mt-12">{listing.price}</p>





                            <form className="mt-2">
                                {/* content */}
                                <div>

                                    {/* Unique Visits and Date */}
                                    <div className="mt-3">
                                        <h3 className="text-sm font-medium text-gray-500">Wyświetlenia: {uniqueUserCount}</h3>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Data dodania:  {formatTimeDifference(diffInHours)}
                                        </h3>
                                    </div>

                                    {/* Size */}
                                    <div className="mt-1">
                                        <h3 className="text-l font-medium text-gray-500">Rozmiar: {listing.details.size.name}</h3>
                                    </div>

                                    {/* Colors */}

                                    <div className="mt-1 flex items-center space-x-3">
                                        <h3 className="text-l font-medium text-gray-500">Kolor</h3>

                                        {listing.details?.detail_color?.length > 0 ? (
                                            listing.details.detail_color.map((detailColor) => (
                                                <div
                                                    key={detailColor.color.id}
                                                    aria-label={detailColor.color.name}
                                                    className={`relative -m-0.5 flex items-center justify-center rounded-full p-0.5`}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={`h-8 w-8 rounded-full border border-black border-opacity-10`}
                                                        style={{ backgroundColor: detailColor.color.hex }}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <>  </>)}
                                    </div>
                                </div>

                                <Link href={route('order.showCheckout', listing.id)}>
                                    <button
                                        type="button"
                                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Kup teraz
                                    </button>
                                </Link>





                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description
                                </h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{listing.description}  {listing.id}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
const product = {

    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],

    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],

    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }
const user = { href: '#', name: 'Chelsea Hagon', createdOn: 'Jan 4, 2020' }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
