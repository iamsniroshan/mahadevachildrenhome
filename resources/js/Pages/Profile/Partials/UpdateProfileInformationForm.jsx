import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [previewUrl, setPreviewUrl] = useState(user.profile_pic ? `/storage/${user.profile_pic}` : null);

    const { data, setData, post, transform, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            photo: null,
        });

    const submit = (e) => {
        e.preventDefault();

        transform((data) => ({ ...data, _method: 'patch' }));
        post(route('profile.update'), {
            forceFormData: true,
            onFinish: () => transform((data) => data),
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        setData('photo', file);
        setPreviewUrl(file ? URL.createObjectURL(file) : (user.profile_pic ? `/storage/${user.profile_pic}` : null));
    };

    return (
        <section className={className}>
            <header className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900">
                    Profile Information
                </h2>

                <p className="text-sm text-slate-600">
                    Update your account&apos;s profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex items-center gap-5">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-rose-100 bg-rose-50">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-rose-900">
                                {user.name?.[0]?.toUpperCase() ?? 'U'}
                            </div>
                        )}
                    </div>
                    <div className="space-y-1.5">
                        <InputLabel htmlFor="photo" value="Profile Photo" className="text-slate-700" />
                        <input
                            id="photo"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={handlePhotoChange}
                            className="block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-rose-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-rose-950"
                        />
                        <p className="text-xs text-slate-400">JPG or PNG, up to 2MB.</p>
                        <InputError className="mt-1" message={errors.photo} />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" className="text-slate-700" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-rose-500 focus:ring-rose-500"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-slate-700" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full rounded-xl border-slate-200 bg-slate-50 focus:border-rose-500 focus:ring-rose-500"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton
                        className="rounded-xl bg-rose-900 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-rose-800"
                        disabled={processing}
                    >
                        Save
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
