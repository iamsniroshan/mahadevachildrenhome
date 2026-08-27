import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout header="Profile Settings">
            <Head title="Profile Settings" />

            <div className="space-y-8">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-2xl"
                    />
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                    <UpdatePasswordForm className="max-w-2xl" />
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
                    <DeleteUserForm className="max-w-2xl" />
                </div>
            </div>
        </AdminLayout>
    );
}
