import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.updateEmail"));
    };

    return (
        <form onSubmit={submit} className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="email" value="Adres e-mail" />

                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    required
                    autoComplete="username"
                />

                <InputError className="mt-2" message={errors.email} />
            </div>

            {mustVerifyEmail && user.email_verified_at === null && (
                <div>
                    <p className="mt-2 text-sm text-gray-800">
                        Twój adres e-mail nie jest zweryfikowany.
                        <Link
                            href={route("verification.send")}
                            method="post"
                            as="button"
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Kliknij tutaj, aby wysłać ponownie link do
                            weryfikacji.
                        </Link>
                    </p>

                    {status === "verification-link-sent" && (
                        <div className="mt-2 text-sm font-medium text-green-600">
                            Nowy link weryfikacyjny został wysłany na twój adres
                            e-mail.
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Zapisz</PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Zapisano</p>
                </Transition>
            </div>
        </form>
    );
}
