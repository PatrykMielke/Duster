import React from 'react'

export default function Logo() {
    return (
        <div className="ml-4 flex lg:ml-0">
            <a href={route("HomePage")}>
                <span className="sr-only">
                    Your Company
                </span>
                <img
                    alt=""
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                />
            </a>
        </div>)
}
