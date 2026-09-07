import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import FormActions from '@/Components/Admin/FormActions';
import { Head, router, useForm } from '@inertiajs/react';
import { useMemo, useRef, useState } from 'react';

const emptyTemplate = {
    name: '',
    subject: '',
    body: '',
    is_active: true,
};

const previewTemplate = (body) => {
    const sampleValues = {
        donor_name: 'Sample Donor',
        amount: '25,000.00',
        currency: 'LKR',
        category: 'Education',
        donation_type: 'One Time',
        status: 'Confirmed',
        invoice_number: 'INV-2026-0001',
        app_name: 'Mahadeva Children Home',
    };

    const renderedBody = Object.entries(sampleValues).reduce(
        (content, [key, value]) => content.replaceAll(`{{ ${key} }}`, value).replaceAll(`{{${key}}}`, value),
        body ?? '',
    );

    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body lang="en" style="margin:0;padding:0;background:#ffffff;color:#000000;font-family:Arial,Helvetica,'Nirmala UI','Nirmala',sans-serif;">
${renderedBody}
</body>
</html>`;
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
                                <div className="overflow-hidden rounded-xl border border-slate-200 p-3">
                                    <iframe
                                        title="Email template preview"
                                        srcDoc={previewTemplate(selectedTemplate.body)}
                                        className="h-[32rem] w-full bg-[#edf6fb]"
                                        sandbox=""
                                    />
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
                            <RichEmailEditor
                                editorKey={selectedTemplate?.id ?? 'new'}
                                value={form.data.body}
                                onChange={(v) => form.setData('body', v)}
                                error={form.errors.body}
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
                                Available placeholders: {'{{ donor_name }}'}, {'{{ amount }}'}, {'{{ currency }}'}, {'{{ category }}'}, {'{{ donation_type }}'}, {'{{ status }}'}, {'{{ invoice_number }}'}, {'{{ app_name }}'}
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

function RichEmailEditor({ editorKey, value, onChange, error }) {
    const editorRef = useRef(null);
    const selectionRef = useRef(null);

    const saveSelection = () => {
        const selection = window.getSelection();

        if (selection?.rangeCount && editorRef.current?.contains(selection.anchorNode)) {
            selectionRef.current = selection.getRangeAt(0);
        }
    };

    const restoreSelection = () => {
        const selection = window.getSelection();

        if (selectionRef.current && selection) {
            selection.removeAllRanges();
            selection.addRange(selectionRef.current);
        }
    };

    const applyCommand = (command, commandValue = null) => {
        editorRef.current?.focus();
        restoreSelection();
        document.execCommand(command, false, commandValue);
        saveSelection();
    };

    const addLink = () => {
        const url = window.prompt('Enter link URL');

        if (url) {
            applyCommand('createLink', url);
        }
    };

    return (
        <div className="space-y-1.5">
            <label htmlFor="body" className="block text-xs font-bold uppercase tracking-wide text-slate-600">
                Email Body <span className="text-rose-600">*</span>
            </label>

            <div className="overflow-hidden rounded-xl border border-slate-300 bg-white focus-within:border-rose-900 focus-within:ring-1 focus-within:ring-rose-900">
                <div className="flex flex-wrap items-center gap-1 border-b border-slate-200 bg-white p-2">
                    <EditorButton label="Bold" onClick={() => applyCommand('bold')}>
                        <strong>B</strong>
                    </EditorButton>
                    <EditorButton label="Italic" onClick={() => applyCommand('italic')}>
                        <em>I</em>
                    </EditorButton>
                    <EditorButton label="Underline" onClick={() => applyCommand('underline')}>
                        <u>U</u>
                    </EditorButton>
                    <label className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700">
                        Size
                        <select
                            aria-label="Font size"
                            defaultValue="3"
                            onChange={(event) => applyCommand('fontSize', event.target.value)}
                            onMouseDown={saveSelection}
                            className="border-0 bg-transparent p-0 text-xs font-semibold text-slate-700 outline-none"
                        >
                            <option value="1">10px</option>
                            <option value="2">12px</option>
                            <option value="3">14px</option>
                            <option value="4">18px</option>
                            <option value="5">24px</option>
                            <option value="6">30px</option>
                            <option value="7">36px</option>
                        </select>
                    </label>
                    <label className="flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700">
                        Color
                        <input
                            aria-label="Text color"
                            type="color"
                            defaultValue="#000000"
                            onChange={(event) => applyCommand('foreColor', event.target.value)}
                            onMouseDown={saveSelection}
                            className="h-4 w-5 cursor-pointer border-0 bg-transparent p-0"
                        />
                    </label>
                    <EditorButton label="Align left" onClick={() => applyCommand('justifyLeft')}>
                        Left
                    </EditorButton>
                    <EditorButton label="Align center" onClick={() => applyCommand('justifyCenter')}>
                        Center
                    </EditorButton>
                    <EditorButton label="Align right" onClick={() => applyCommand('justifyRight')}>
                        Right
                    </EditorButton>
                    <EditorButton label="Heading" onClick={() => applyCommand('formatBlock', 'h2')}>
                        H2
                    </EditorButton>
                    <EditorButton label="Bulleted list" onClick={() => applyCommand('insertUnorderedList')}>
                        • List
                    </EditorButton>
                    <EditorButton label="Numbered list" onClick={() => applyCommand('insertOrderedList')}>
                        1. List
                    </EditorButton>
                    <EditorButton label="Add link" onClick={addLink}>
                        Link
                    </EditorButton>
                </div>

                <div
                    key={editorKey}
                    id="body"
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    dangerouslySetInnerHTML={{ __html: value ?? '' }}
                    onMouseUp={saveSelection}
                    onKeyUp={saveSelection}
                    onInput={(event) => onChange(event.currentTarget.innerHTML)}
                    className="min-h-[26rem] bg-white p-4 text-sm text-slate-800 outline-none [&_a]:text-rose-900 [&_a]:underline"
                />
            </div>

            {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
            <p className="text-xs text-slate-500">
                Use the toolbar to format the email. Placeholders remain available: {'{{ donor_name }}'}, {'{{ amount }}'}, {'{{ currency }}'}, {'{{ category }}'}, {'{{ donation_type }}'}, {'{{ status }}'}, {'{{ invoice_number }}'}, {'{{ app_name }}'}
            </p>
        </div>
    );
}

function EditorButton({ label, onClick, children }) {
    return (
        <button
            type="button"
            title={label}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onClick}
            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-900"
        >
            {children}
        </button>
    );
}
