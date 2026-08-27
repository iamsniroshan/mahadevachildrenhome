export default function StatusBadge({ value, map }) {
    const config = map[value] ?? { label: value, className: 'bg-slate-100 text-slate-700' };

    return (
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${config.className}`}>
            {config.label}
        </span>
    );
}
