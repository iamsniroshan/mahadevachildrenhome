export default function ActionButtons({ onEdit, onDelete, editLabel = 'Edit', deleteLabel = 'Delete' }) {
    return (
        <div className="flex items-center justify-end gap-3">
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
