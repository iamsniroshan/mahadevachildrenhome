export default function ActionButtons({ onView, onEdit, onDelete, viewLabel = 'View', editLabel = 'Edit', deleteLabel = 'Delete' }) {
    return (
        <div className="flex items-center justify-end gap-3">
            {onView && (
                <button
                    type="button"
                    onClick={onView}
                    title={viewLabel}
                    className="text-slate-400 hover:text-rose-900"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            )}
            {onEdit && (
                <button type="button" onClick={onEdit} className="text-xs font-bold text-rose-900 hover:underline">
                    {editLabel}
                </button>
            )}
            {onDelete && (
                <button type="button" onClick={onDelete} className="text-xs font-bold text-slate-400 hover:text-rose-600">
                    {deleteLabel}
                </button>
            )}
        </div>
    );
}
