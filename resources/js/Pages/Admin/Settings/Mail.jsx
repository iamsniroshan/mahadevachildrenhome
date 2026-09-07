import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import FormActions from '@/Components/Admin/FormActions';
import { Head, useForm } from '@inertiajs/react';

export default function Mail({ settings }) {
    const form = useForm({
        mailer: settings.mailer ?? 'log',
        host: settings.host ?? '',
        port: settings.port ?? 587,
        username: settings.username ?? '',
        password: '',
        encryption: settings.encryption ?? '',
        from_address: settings.from_address ?? '',
        from_name: settings.from_name ?? '',
        cc_address: settings.cc_address ?? '',
        letterhead_path: null,
        remove_letterhead: false,
        donation_confirmation_enabled: settings.donation_confirmation_enabled ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        form.transform((data) => ({ ...data, _method: 'put' }));
        form.post(route('admin.settings.mail.update'), { preserveScroll: true, forceFormData: true });
    };

    return (
        <AdminLayout header="Mail Settings">
            <Head title="Mail Settings" />

            <div className="max-w-3xl">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="mb-6 text-sm text-slate-500">
                        Configure how outgoing email is delivered. These settings control the donation
                        confirmation email sent to donors.
                    </p>

                    <form onSubmit={submit} className="space-y-6">
                        <Field
                            label="Confirmation Email to Donor"
                            name="donation_confirmation_enabled"
                            type="checkbox"
                            value={form.data.donation_confirmation_enabled}
                            onChange={(v) => form.setData('donation_confirmation_enabled', v)}
                            error={form.errors.donation_confirmation_enabled}
                        />

                        <div className="grid gap-6 md:grid-cols-2">
                            <Field
                                label="Mail Driver"
                                name="mailer"
                                type="select"
                                value={form.data.mailer}
                                onChange={(v) => form.setData('mailer', v)}
                                error={form.errors.mailer}
                                options={[
                                    { value: 'log', label: 'Log (no real email — for testing)' },
                                    { value: 'smtp', label: 'SMTP' },
                                ]}
                            />
                            <Field label="From Name" name="from_name" value={form.data.from_name} onChange={(v) => form.setData('from_name', v)} error={form.errors.from_name} required />
                            <Field label="From Email Address" name="from_address" type="email" value={form.data.from_address} onChange={(v) => form.setData('from_address', v)} error={form.errors.from_address} required />
                            <Field label="CC Email Address" name="cc_address" type="email" value={form.data.cc_address} onChange={(v) => form.setData('cc_address', v)} error={form.errors.cc_address} />
                            <div className="space-y-1.5">
                                <label htmlFor="letterhead_path" className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                                    Invoice Letterhead (PDF)
                                </label>
                                {(!settings.letterhead_path || form.data.remove_letterhead) && (
                                    <Field label="Invoice Letterhead (PDF)" hideLabel name="letterhead_path" type="file" accept="application/pdf" onChange={(v) => form.setData('letterhead_path', v)} error={form.errors.letterhead_path} />
                                )}
                            </div>
                        </div>

                        {settings.letterhead_path && !form.data.remove_letterhead && (
                            <div className="-mt-4 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                                <p className="text-xs font-semibold text-slate-600">
                                    Attached: {settings.letterhead_path.split('/').pop()}
                                </p>
                                <a
                                    href={`/storage/${settings.letterhead_path}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs font-semibold text-rose-900 hover:underline"
                                >
                                    Open PDF
                                </a>
                                <button
                                    type="button"
                                    onClick={() => form.setData('remove_letterhead', true)}
                                    className="text-xs font-semibold text-rose-700 hover:underline"
                                >
                                    Remove
                                </button>
                            </div>
                        )}

                        {form.data.remove_letterhead && (
                            <p className="-mt-4 text-xs font-semibold text-rose-700">
                                Letterhead marked for removal. Upload a new PDF or save to remove it.
                            </p>
                        )}

                        {form.data.letterhead_path && (
                            <p className="-mt-4 text-xs text-teal-700">
                                New file selected: {form.data.letterhead_path.name}
                            </p>
                        )}

                        {form.data.mailer === 'smtp' && (
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                                <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-slate-500">SMTP Server</h3>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <Field label="Host" name="host" value={form.data.host} onChange={(v) => form.setData('host', v)} error={form.errors.host} required />
                                    <Field label="Port" name="port" type="number" value={form.data.port} onChange={(v) => form.setData('port', v)} error={form.errors.port} required />
                                    <Field label="Username" name="username" value={form.data.username} onChange={(v) => form.setData('username', v)} error={form.errors.username} />
                                    <Field
                                        label="Encryption"
                                        name="encryption"
                                        type="select"
                                        value={form.data.encryption ?? ''}
                                        onChange={(v) => form.setData('encryption', v)}
                                        error={form.errors.encryption}
                                        options={[
                                            { value: '', label: 'None' },
                                            { value: 'tls', label: 'TLS' },
                                            { value: 'ssl', label: 'SSL' },
                                        ]}
                                    />
                                    <Field
                                        label={settings.has_password ? 'Password (leave blank to keep current)' : 'Password'}
                                        name="password"
                                        type="password"
                                        value={form.data.password}
                                        onChange={(v) => form.setData('password', v)}
                                        error={form.errors.password}
                                    />
                                </div>
                            </div>
                        )}

                        <FormActions onCancel={() => window.history.back()} processing={form.processing} submitLabel="Save Settings" />
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
