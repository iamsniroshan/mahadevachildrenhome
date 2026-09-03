import { useState } from 'react';

export default function DataTable({ columns, data, keyField = 'id', emptyMessage = 'No records found.', actions }) {
    const [searchTerm, setSearchTerm] = useState('');
    const records = data ?? [];
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredData = records.filter((row) =>
        !normalizedSearch || Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch))
    );

    const updateSearch = (value) => {
        setSearchTerm(value);
    };

    return (
        <div className="flex h-[calc(100vh-9rem)] min-h-[24rem] flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-xl items-center gap-3">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(event) => updateSearch(event.target.value)}
                        placeholder="Search records..."
                        aria-label="Search records"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                    />
                </div>
                <div className="flex items-center justify-end">{actions}</div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200 bg-white">
                <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-slate-50">
                        <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            {columns.map((col) => (
                                <th key={col.key} className={`px-4 py-3.5 first:pl-5 last:pr-5 ${col.align === 'right' ? 'text-right' : ''}`}>
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                        {filteredData.map((row, index) => (
                            <tr key={row[keyField]} className={`transition-colors hover:bg-rose-50/60 ${index % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'}`}>
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className={`px-4 py-3.5 first:pl-5 last:pr-5 ${col.align === 'right' ? 'text-right' : ''} ${col.className ?? ''}`}
                                    >
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        {filteredData.length === 0 && (
                            <tr>
                                <td colSpan={columns.length} className="py-10 text-center text-sm text-slate-400">
                                    {records.length === 0 ? emptyMessage : 'No matching records found.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot className="sticky bottom-0 z-10 border-t border-slate-200 bg-slate-50">
                        <tr>
                            <td colSpan={columns.length} className="px-5 py-3 text-xs font-medium text-slate-400">
                                Showing {filteredData.length} of {records.length} records
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    );
}
