import { useMemo, useState } from 'react';
import { Table, Input } from 'antd';

export default function DataTable({ columns, data, keyField = 'id', emptyMessage = 'No records found.', actions }) {
    const [searchTerm, setSearchTerm] = useState('');
    const records = data ?? [];
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const filteredData = records.filter((row) =>
        !normalizedSearch || Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch))
    );

    const antColumns = useMemo(
        () =>
            columns.map((col) => ({
                key: col.key,
                title: col.header,
                align: col.align,
                className: col.className,
                render: (_, row) => (col.render ? col.render(row) : row[col.key]),
            })),
        [columns]
    );

    return (
        <div className="flex h-[calc(100vh-9rem)] min-h-[24rem] flex-col gap-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-xl items-center gap-3">
                    <Input.Search
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Search records..."
                        allowClear
                        aria-label="Search records"
                    />
                </div>
                <div className="flex items-center justify-end">{actions}</div>
            </div>

            <div className="min-h-0 flex-1 overflow-auto rounded-lg border border-slate-200 bg-white">
                <Table
                    rowKey={keyField}
                    columns={antColumns}
                    dataSource={filteredData}
                    pagination={{ pageSize: 10, hideOnSinglePage: true }}
                    locale={{ emptyText: records.length === 0 ? emptyMessage : 'No matching records found.' }}
                    size="middle"
                    footer={() => (
                        <span className="text-xs font-medium text-slate-400">
                            Showing {filteredData.length} of {records.length} records
                        </span>
                    )}
                />
            </div>
        </div>
    );
}
