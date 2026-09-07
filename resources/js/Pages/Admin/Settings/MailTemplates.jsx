import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import FormActions from '@/Components/Admin/FormActions';
import { Head, router, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const emptyTemplate = {
    name: '',
    subject: '',
    body: '',
    is_active: true,
};

export default function MailTemplates({ templates = [] }) {
    const [selectedId, setSelectedId] = useState(templates[0]?.id ?? null);
    const [mode, setMode] = useState('view');
    const selectedTemplate = useMemo(
        () => selectedId === null ? null : templates.find((template) => template.id === selectedId) ?? null,
        [templates, selectedId],
    );

    const form = useForm({
        ...emptyTemplate,
        ...(selectedTemplate ?? {}),
    });

    const submit = (e) => {
        e.preventDefault();

        if (mode === 'view') {
            return;
        }

        const action = selectedTemplate?.id
            ? router.put(route('admin.settings.mail.templates.update', selectedTemplate.id), form.data)
            : form.post(route('admin.settings.mail.templates.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    form.reset();
                    setSelectedId(null);
                    setMode('create');
                },
            });

        if (selectedTemplate?.id) {
            action
                .then(() => {
                    form.reset();
                    setSelectedId(null);
                    setMode('view');
                })
                .catch(() => {});
        }
    };

    const handleSelect = (template, nextMode = 'view') => {
        setSelectedId(template.id);
        setMode(nextMode);
        form.reset();
        form.setData({
            name: template.name,
            subject: template.subject,
            body: template.body,
            is_active: template.is_active,
        });
    };

    const resetForm = () => {
        form.setData({ ...emptyTemplate });
        form.clearErrors();
        setSelectedId(null);
        setMode('create');
    };

    const remove = (template) => {
        if (confirm(`Delete template "${template.name}"?`)) {
            router.delete(route('admin.settings.mail.templates.destroy', template.id), {
                onSuccess: () => {
                    if (selectedId === template.id) {
                        resetForm();
                    }
                },
            });
        }
    };

    return (
        <AdminLayout header="Mail Templates">
            <Head title="Mail Templates" />

            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-lg font-bold text-slate-900">Templates</h2>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-lg bg-rose-900 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-950"
                        >
                            Add
                        </button>
                    </div>

                    <div className="space-y-3">
                        {templates.length === 0 ? (
                            <p className="text-sm text-slate-500">No donation email templates saved yet.</p>
                        ) : (
                            templates.map((template) => {
                                const isSelected = selectedTemplate?.id === template.id;

                                return (
                                    <div
                                        key={template.id}
                                        className={`rounded-xl border p-3 transition ${
                                            isSelected
                                                ? 'border-rose-900 bg-rose-50 shadow-sm'
                                                : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <button
                                                type="button"
                                                onClick={() => handleSelect(template, 'view')}
                                                className="min-w-0 flex-1 text-left"
                                            >
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-slate-800">{template.name}</p>
                                                    <p className="truncate text-xs text-slate-500">{template.subject}</p>
                                                </div>
                                            </button>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleSelect(template, 'view')}
                                                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-700 hover:bg-slate-100"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleSelect(template, 'edit')}
                                                    className="rounded-md border border-rose-200 bg-white px-2 py-1 text-[10px] font-semibold text-rose-700 hover:bg-rose-50"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between gap-3">
                        <h2 className="text-lg font-bold text-slate-900">
                            {selectedTemplate && mode !== 'create' && mode !== 'edit' ? 'Template Details' : mode === 'edit' ? 'Edit Template' : 'Add New Template'}
                        </h2>
                        {selectedTemplate && mode !== 'create' && (
                            <div className="flex items-center gap-2">
                                {mode !== 'edit' && (
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(selectedTemplate, 'edit')}
                                        className="rounded-md border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50"
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() => remove(selectedTemplate)}
                                    className="rounded-md border border-rose-200 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {mode === 'view' && selectedTemplate ? (
                        <div className="space-y-6">
                            <div>
                                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">Template Name</p>
                                <p className="text-base font-semibold text-slate-900">{selectedTemplate.name}</p>
                            </div>

                            <div>
                                <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">Email Subject</p>
                                <p className="text-base text-slate-800">{selectedTemplate.subject}</p>
                            </div>

                            <div>
                                <div className="mb-1 flex items-center justify-between gap-3">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Email Body</p>
                                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                                        selectedTemplate.is_active
                                            ? 'bg-emerald-100 text-emerald-700'
                                            : 'bg-slate-100 text-slate-600'
                                    }`}>
                                        {selectedTemplate.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="min-h-64 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                                    {selectedTemplate.body}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => handleSelect(selectedTemplate, 'edit')}
                                    className="rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-rose-950"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="space-y-4">
                            <Field
                                label="Template Name"
                                name="name"
                                value={form.data.name}
                                onChange={(v) => form.setData('name', v)}
                                error={form.errors.name}
                                required
                            />
                            <Field
                                label="Email Subject"
                                name="subject"
                                value={form.data.subject}
                                onChange={(v) => form.setData('subject', v)}
                                error={form.errors.subject}
                                required
                            />
                            <Field
                                label="Email Body"
                                name="body"
                                type="textarea"
                                rows={12}
                                value={form.data.body}
                                onChange={(v) => form.setData('body', v)}
                                error={form.errors.body}
                                required
                            />
                            <Field
                                label="Active"
                                name="is_active"
                                type="checkbox"
                                value={form.data.is_active}
                                onChange={(v) => form.setData('is_active', v)}
                                error={form.errors.is_active}
                            />

                            <p className="text-xs text-slate-500">
                                Available placeholders: {'{{ donor_name }}'}, {'{{ amount }}'}, {'{{ currency }}'}, {'{{ category }}'}, {'{{ donation_type }}'}, {'{{ status }}'}, {'{{ app_name }}'}
                            </p>

                            <FormActions
                                onCancel={() => {
                                    if (mode === 'create') {
                                        resetForm();
                                        return;
                                    }

                                    if (selectedTemplate) {
                                        handleSelect(selectedTemplate, 'view');
                                    }
                                }}
                                processing={form.processing}
                                submitLabel={mode === 'edit' ? 'Update Template' : 'Save Template'}
                            />
                        </form>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
