import React, { useState } from 'react';
import CustomTable from '../components/CustomTable';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <span className={val >= 0 ? 'text-green-600' : 'text-red-600'}>
          {val >= 0 ? '+' : ''}
          {val.toLocaleString()}₫
        </span>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    if (confirm('Delete this transaction?')) {
      setData((d) => d.filter((row) => row.id !== id));
    }
  };

  const handleEdit = (row: Transaction) => {
    alert('Edit transaction: ' + JSON.stringify(row, null, 2));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Transactions</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
          + Add Transaction
        </button>
      </div>

      <CustomTable<Transaction>
        columns={columns}
        data={data}
        selectable
        searchable
        rowActions={(row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(row)}
              className="p-1 text-blue-600 hover:text-blue-800"
            >
              <EditIcon fontSize="small" />
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="p-1 text-red-600 hover:text-red-800"
            >
              <DeleteIcon fontSize="small" />
            </button>
          </div>
        )}
        onSelectionChange={(selected) => alert(selected)}
      />
    </div>
  );
}
