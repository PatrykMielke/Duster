import React from "react";

export default function Logo() {
    return (
        <div className="ml-4 flex lg:ml-0">
            <a href={route("index")}>
                <span className="sr-only">Duster</span>
                <img alt="" src="/logo.png" className="h-8 w-auto" />
            </a>
        </div>
    );
}
