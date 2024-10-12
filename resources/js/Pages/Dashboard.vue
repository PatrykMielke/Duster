<template>
    <div>
        <Menubar :model="items" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    label: "File",
                    icon: "pi pi-fw pi-file",
                    items: [
                        { label: "New", icon: "pi pi-fw pi-plus" },
                        { label: "Open", icon: "pi pi-fw pi-download" },
                    ],
                },
                {
                    label: "Edit",
                    icon: "pi pi-fw pi-pencil",
                    items: [{ label: "Undo", icon: "pi pi-fw pi-refresh" }],
                },
                {
                    label: "MegaMenu",
                    icon: "pi pi-fw pi-th-large",
                    items: [
                        {
                            label: "Products",
                            items: [
                                {
                                    label: "Electronics",
                                    items: [
                                        {
                                            label: "TV",
                                            icon: "pi pi-fw pi-video",
                                        },
                                        {
                                            label: "Mobile",
                                            icon: "pi pi-fw pi-mobile",
                                        },
                                    ],
                                },
                                {
                                    label: "Clothing",
                                    items: [
                                        {
                                            label: "Men",
                                            icon: "pi pi-fw pi-male",
                                        },
                                        {
                                            label: "Women",
                                            icon: "pi pi-fw pi-female",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            label: "Services",
                            items: [
                                {
                                    label: "Consulting",
                                    icon: "pi pi-fw pi-book",
                                },
                                {
                                    label: "Support",
                                    icon: "pi pi-fw pi-info-circle",
                                },
                            ],
                        },
                    ],
                },
                {
                    label: "Help",
                    icon: "pi pi-fw pi-help",
                    items: [
                        { label: "Contents", icon: "pi pi-fw pi-book" },
                        { label: "Search", icon: "pi pi-fw pi-search" },
                    ],
                },
            ],
        };
    },
};
</script>

<style>
/* Optional: Custom styles */
</style>
