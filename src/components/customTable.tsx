import React, { useMemo, useState } from 'react';
import { Column, CustomTableProps, Row } from '../types/table';

export default function CustomTable<RowType extends Row>({
  columns,
  data,
  initialSortBy = null,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 10,
  className = '',
  searchable = true,
  selectable = false,
  onSelectionChange,
  rowKey = (r) => (r as any).id ?? JSON.stringify(r),
  rowActions,
}: CustomTableProps<RowType>) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<{ key: string; desc?: boolean } | null>(initialSortBy);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [selectedSet, setSelectedSet] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const value = String((row as any)[col.key] ?? '');
        return value.toLowerCase().includes(q);
      }),
    );
  }, [data, query, columns]);

  const sorted = useMemo(() => {
    if (!sortBy) return filtered;
    const { key, desc } = sortBy;
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = (a as any)[key];
      const vb = (b as any)[key];

      if (va == null && vb == null) return 0;
      if (va == null) return -1;
      if (vb == null) return 1;
      if (typeof va === 'number' && typeof vb === 'number') return va - vb;

      if (va instanceof Date && vb instanceof Date) return +va - +vb;

      return String(va).localeCompare(String(vb), undefined, { numeric: true });
    });
    if (desc) arr.reverse();
    return arr;
  }, [filtered, sortBy, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  const toggleRow = (r: RowType) => {
    const k = String(rowKey(r));
    setSelectedSet((s) => {
      const next = { ...s };
      if (next[k]) delete next[k];
      else next[k] = true;
      const selectedRows = data.filter((row) => next[String(rowKey(row))]);
      onSelectionChange?.(selectedRows as RowType[]);
      return next;
    });
  };

  const toggleSelectAllOnPage = () => {
    setSelectedSet((s) => {
      const next = { ...s };
      const allSelected = pageData.every((r) => next[String(rowKey(r))]);
      if (allSelected) {
        pageData.forEach((r) => delete next[String(rowKey(r))]);
      } else {
        pageData.forEach((r) => (next[String(rowKey(r))] = true));
      }
      const selectedRows = data.filter((row) => next[String(rowKey(row))]);
      onSelectionChange?.(selectedRows as RowType[]);
      return next;
    });
  };

  const isRowSelected = (r: RowType) => !!selectedSet[String(rowKey(r))];

  const onSortClick = (col: Column<RowType>) => {
    if (!col.sortable) return;
    setPage(1);
    setSortBy((cur) => {
      if (!cur || cur.key !== col.key) return { key: col.key, desc: false };
      return { key: col.key, desc: !cur.desc };
    });
  };

  return (
    <div className={`w-full bg-white rounded-2xl shadow-sm p-4 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          {searchable && (
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1"
            />
          )}
          <div className="text-sm text-slate-500">
            {sorted.length} result{sorted.length !== 1 ? 's' : ''}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm">Rows per page:</div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="px-2 py-1 border rounded-md"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-sm text-slate-600 border-b">
              {selectable && (
                <th className="px-3 py-2 text-left w-10">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAllOnPage}
                    checked={pageData.length > 0 && pageData.every(isRowSelected)}
                    aria-label="Select all rows on this page"
                  />
                </th>
              )}

              {columns.map((col) => (
                <th key={col.key} className={`px-3 py-2 text-left select-none ${col.width ?? ''}`}>
                  <button
                    onClick={() => onSortClick(col)}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-xs opacity-60">
                        {sortBy?.key === col.key ? (sortBy.desc ? '▾' : '▴') : '↕'}
                      </span>
                    )}
                  </button>
                </th>
              ))}

              {rowActions && <th className="px-3 py-2 w-24">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="py-8 text-center text-slate-500"
                >
                  No rows
                </td>
              </tr>
            )}

            {pageData.map((row, i) => (
              <tr
                key={String(rowKey(row)) + '-' + i}
                className={`border-b last:border-b-0 hover:bg-slate-50 ${isRowSelected(row) ? 'bg-slate-50' : ''}`}
              >
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      checked={isRowSelected(row)}
                      onChange={() => toggleRow(row)}
                      aria-label={`Select row ${String(rowKey(row))}`}
                    />
                  </td>
                )}

                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-3 py-3 align-top ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'}`}
                  >
                    {col.render
                      ? col.render((row as any)[col.key], row)
                      : String((row as any)[col.key] ?? '')}
                  </td>
                ))}

                {rowActions && <td className="px-3 py-2">{rowActions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="text-sm text-slate-600">
          Page {currentPage} of {pageCount}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            « First
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ‹ Prev
          </button>

          <input
            type="number"
            value={currentPage}
            onChange={(e) => {
              const v = Number(e.target.value || 1);
              if (Number.isFinite(v)) setPage(Math.min(Math.max(1, Math.floor(v)), pageCount));
            }}
            className="w-16 text-center px-2 py-1 border rounded"
          />

          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage === pageCount}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next ›
          </button>
          <button
            onClick={() => setPage(pageCount)}
            disabled={currentPage === pageCount}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Last »
          </button>
        </div>
      </div>
    </div>
  );
}
