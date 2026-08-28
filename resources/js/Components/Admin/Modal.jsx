export default function Modal({ open, onClose, title, eyebrow, children }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-2 sm:p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 sm:p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                        {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-700">{eyebrow}</p>}
                        <h3 className="text-lg sm:text-2xl font-bold text-slate-900 truncate">{title}</h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-shrink-0 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        Close
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
