export default function DataTable({ columns, data, keyField = 'id', emptyMessage = 'No records found.' }) {
    return (
        <div className="max-h-[65vh] overflow-y-auto overflow-x-auto rounded-lg">
            <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-white">
                    <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {columns.map((col) => (
                            <th key={col.key} className={`pb-3 bg-white ${col.align === 'right' ? 'text-right' : ''}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                    {data.map((row) => (
                        <tr key={row[keyField]}>
                            {columns.map((col) => (
                                <td
                                    key={col.key}
                                    className={`py-4 ${col.align === 'right' ? 'text-right' : ''} ${col.className ?? ''}`}
                                >
                                    {col.render ? col.render(row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="py-8 text-center text-sm text-slate-400">
                                {emptyMessage}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
