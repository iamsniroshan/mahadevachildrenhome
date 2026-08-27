export default function FormActions({ onCancel, processing, submitLabel }) {
    return (
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
            <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={processing}
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
            >
                {submitLabel}
            </button>
        </div>
    );
}
