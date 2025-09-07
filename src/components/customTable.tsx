import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { ArrowUpward, ArrowDownward, SwapVert } from '@mui/icons-material';
import { Column, CustomTableProps, Row } from '../types/table';

export default function CustomTable<RowType extends Row>({
  columns,
  data,
  initialSortBy = null,
  pageSizeOptions = [5, 10, 20],
  defaultPageSize = 10,
  searchable = true,
  selectable = false,
  onSelectionChange,
  rowKey = (r) => (r as any).id ?? JSON.stringify(r),
  rowActions,
}: CustomTableProps<RowType>) {
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<{ key: string; desc?: boolean } | null>(initialSortBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize);
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
  }, [filtered, sortBy]);

  const pageData = useMemo(() => {
    const start = page * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [sorted, page, rowsPerPage]);

  const isRowSelected = (r: RowType) => !!selectedSet[String(rowKey(r))];

  const toggleRow = (r: RowType) => {
    const k = String(rowKey(r));
    setSelectedSet((s) => {
      const next = { ...s };
      if (next[k]) delete next[k];
      else next[k] = true;
      onSelectionChange?.(data.filter((row) => next[String(rowKey(row))]) as RowType[]);
      return next;
    });
  };

  const toggleSelectAllOnPage = () => {
    setSelectedSet((s) => {
      const next = { ...s };
      const allSelected = pageData.every((r) => next[String(rowKey(r))]);
      if (allSelected) pageData.forEach((r) => delete next[String(rowKey(r))]);
      else pageData.forEach((r) => (next[String(rowKey(r))] = true));
      onSelectionChange?.(data.filter((row) => next[String(rowKey(row))]) as RowType[]);
      return next;
    });
  };

  const onSortClick = (col: Column<RowType>) => {
    if (!col.sortable) return;
    setSortBy((cur) => {
      if (!cur || cur.key !== col.key) return { key: col.key, desc: false };
      return { key: col.key, desc: !cur.desc };
    });
  };

  return (
    <Paper>
      {}
      <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
        {searchable && (
          <TextField
            size="small"
            label="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(0);
            }}
          />
        )}
        <Typography variant="body2" color="text.secondary">
          {sorted.length} result{sorted.length !== 1 ? 's' : ''}
        </Typography>
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              {selectable && (
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={pageData.length > 0 && pageData.every(isRowSelected)}
                    onChange={toggleSelectAllOnPage}
                  />
                </TableCell>
              )}
              {columns.map((col) => (
                <TableCell key={col.key}>
                  <Button
                    endIcon={
                      sortBy?.key === col.key ? (
                        sortBy.desc ? (
                          <ArrowDownward fontSize="small" />
                        ) : (
                          <ArrowUpward fontSize="small" />
                        )
                      ) : (
                        <SwapVert fontSize="small" />
                      )
                    }
                    onClick={() => onSortClick(col)}
                  >
                    {col.header}
                  </Button>
                </TableCell>
              ))}
              {rowActions && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {pageData.map((row, i) => (
              <TableRow key={String(rowKey(row)) + '-' + i} hover selected={isRowSelected(row)}>
                {selectable && (
                  <TableCell padding="checkbox">
                    <Checkbox checked={isRowSelected(row)} onChange={() => toggleRow(row)} />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell key={col.key} align={col.align || 'left'}>
                    {col.render
                      ? col.render((row as any)[col.key], row)
                      : String((row as any)[col.key] ?? '')}
                  </TableCell>
                ))}
                {rowActions && <TableCell>{rowActions(row)}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {}
      <TablePagination
        component="div"
        count={sorted.length}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={pageSizeOptions}
      />
    </Paper>
  );
}
