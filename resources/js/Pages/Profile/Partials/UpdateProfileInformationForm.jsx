import { Link, useForm, usePage } from "@inertiajs/react";
import UpdateNameForm from "./UpdateNameForm";
import UpdateEmailForm from "./UpdateEmailForm";
export default function UpdateProfileInformation({ className = "" }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Informacje o profilu
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Zaaktualizuj swoją nazwę użytkownika oraz adres e-mail
                </p>
            </header>

            <UpdateNameForm />
            <UpdateEmailForm />
        </section>
    );
}
