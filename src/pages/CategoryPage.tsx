import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomTable from '../components/CustomTable';
import { FirestoreService } from '../apis/serviceBase';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FieldConfig } from '../types/form';
import RowFormModal from '../components/FormModal';

export default function CategoryPage() {
  const columns = [
    { key: 'icon', header: 'Icon', sortTable: true },
    { key: 'name', header: 'Name', sortTable: true },
    { key: 'budget', header: 'Budget', sortTable: true },
    { key: 'type', header: 'Type', sortTable: true },
  ];
  const fields: FieldConfig[] = [
    { key: 'icon', label: 'Icon', type: 'text' },
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'budget', label: 'Budget', type: 'number' },
    { key: 'type', label: 'Type', type: 'select', options: ['income', 'expense'] },
  ];
  type Category = {
    id: string;
    icon: string;
    name: string;
    budget: number;
    type: string;
  };
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const categoryService = new FirestoreService(db, 'groups');
  const userService = new FirestoreService(db, 'users');
  const [data, setData] = useState<any[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const userInfo = useRef<any>();
  const fetchData = async () => {
    if (!user?.email) {
      return;
    }
    const userDoc = await userService.getDoc(user.email);
    userInfo.current = userDoc?.data;
    const result = await categoryService.getSubCollectionDocs(
      userInfo.current?.groups[0],
      'categories',
    );

    if (result.success && result.data) {
      setData(result.data.docs);
    }
  };
  const handleSubmit = () => {
    if (!editingCategory) return;
    categoryService.addSubCollectionDoc(userInfo.current.groups[0], 'categories', editingCategory);
    setEditingCategory(undefined);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Category (20)
        </Typography>
        <Button variant="contained" color="success" onClick={() => setOpen(true)}>
          + Add Category
        </Button>
      </Box>
      <Paper elevation={2}>
        <CustomTable columns={columns} data={data} selectable searchable />
      </Paper>
      <RowFormModal<Category>
        open={open}
        initialData={editingCategory}
        fields={fields}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        confirmText={editingCategory ? 'Update' : 'Create'}
      />
    </Box>
  );
}
