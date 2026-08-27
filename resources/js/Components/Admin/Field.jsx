export default function Field({
    label,
    type = 'text',
    name,
    value,
    onChange,
    error,
    options,
    required = false,
    rows = 4,
}) {
    const baseClass =
        'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-rose-900 focus:ring-1 focus:ring-rose-900 outline-none';

    return (
        <div className={type === 'checkbox' ? 'flex items-center gap-2' : 'space-y-1.5'}>
            {type !== 'checkbox' && (
                <label htmlFor={name} className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                    {label} {required && <span className="text-rose-600">*</span>}
                </label>
            )}

            {type === 'textarea' && (
                <textarea
                    id={name}
                    name={name}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    rows={rows}
                    className={baseClass}
                />
            )}

            {type === 'select' && (
                <select
                    id={name}
                    name={name}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={baseClass}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            )}

            {type === 'checkbox' && (
                <>
                    <input
                        id={name}
                        name={name}
                        type="checkbox"
                        checked={!!value}
                        onChange={(e) => onChange(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-rose-900 focus:ring-rose-900"
                    />
                    <label htmlFor={name} className="text-sm font-medium text-slate-700">
                        {label}
                    </label>
                </>
            )}

            {['text', 'number', 'date', 'datetime-local', 'email', 'password'].includes(type) && (
                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value ?? ''}
                    onChange={(e) => onChange(e.target.value)}
                    className={baseClass}
                />
            )}

            {type === 'file' && (
                <input
                    id={name}
                    name={name}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files?.[0] ?? null)}
                    className={`${baseClass} file:mr-3 file:rounded-md file:border-0 file:bg-rose-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-rose-950`}
                />
            )}

            {type === 'file-multi' && (
                <input
                    id={name}
                    name={name}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => onChange(Array.from(e.target.files ?? []))}
                    className={`${baseClass} file:mr-3 file:rounded-md file:border-0 file:bg-rose-900 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-rose-950`}
                />
            )}

            {error && <p className="text-xs font-semibold text-rose-600">{error}</p>}
        </div>
    );
}
