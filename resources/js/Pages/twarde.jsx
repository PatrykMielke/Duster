import React from 'react'

export default function twarde() {
    return (
        <div>

            <div
                className="grid grid-cols-1 gap-4 transition-[grid-template-columns] lg:grid-cols-[120px_1fr] lg:gap-8 lg:[&:has(>*:first-child:hover)]:grid-cols-[160px_1fr]"
            >
                <div className="h-32 rounded-lg bg-gray-200"></div>
                <div className="h-32 rounded-lg bg-gray-200"></div>
            </div>


        </div>
    )
}
