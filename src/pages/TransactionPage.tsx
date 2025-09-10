import React, { useState } from 'react';
import { Box, Typography, Button, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomTable from '../components/CustomTable';

type Transaction = {
  id: number;
  date: string;
  description: string;
  category: string;
  wallet: string;
  amount: number;
};

const initialData: Transaction[] = [
  {
    id: 1,
    date: '2025-09-01',
    description: 'Lunch',
    category: 'Food 🍔',
    wallet: 'Cash',
    amount: -150000,
  },
  {
    id: 2,
    date: '2025-09-01',
    description: 'Salary',
    category: 'Income 💼',
    wallet: 'Bank ACB',
    amount: 12000000,
  },
  {
    id: 3,
    date: '2025-09-03',
    description: 'Grab Ride',
    category: 'Transport 🚖',
    wallet: 'Momo',
    amount: -50000,
  },
];

export default function TransactionPage() {
  const [data, setData] = useState<Transaction[]>(initialData);

  const columns = [
    { key: 'date', header: 'Date', sortable: true },
    { key: 'description', header: 'Transaction', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'wallet', header: 'Wallet', sortable: true },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      align: 'right' as const,
      render: (val: number) => (
        <Typography variant="body2" sx={{ color: val >= 0 ? 'success.main' : 'error.main' }}>
          {val >= 0 ? '+' : ''}
          {val.toLocaleString()}₫
        </Typography>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    if (window.confirm('Delete this transaction?')) {
      setData((d) => d.filter((row) => row.id !== id));
    }
  };

  const handleEdit = (row: Transaction) => {
    alert('Edit transaction: ' + JSON.stringify(row, null, 2));
  };

  return (
    <Box p={3}>
      {}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Transactions
        </Typography>
        <Button variant="contained" color="success">
          + Add Transaction
        </Button>
      </Box>

      {}
      <Paper elevation={2}>
        <CustomTable<Transaction>
          columns={columns}
          data={data}
          selectable
          searchable
          rowActions={(row) => (
            <Box display="flex" gap={1}>
              <IconButton color="primary" onClick={() => handleEdit(row)} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(row.id)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          onSelectionChange={(selected) => alert(selected)}
        />
      </Paper>
    </Box>
  );
}
