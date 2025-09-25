import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import CustomTable from '../components/CustomTable';
import { FirestoreService } from '../apis/serviceBase';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { FieldConfig } from '../types/form';
import RowFormModal from '../components/FormModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Timestamp } from 'firebase/firestore';
import { openConfirm } from '../store/slices/confirmSlice';

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
    createdAt: Date;
    createdBy: string;
    spent: number;
  };
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const categoryService = new FirestoreService(db, 'groups');
  const userService = new FirestoreService(db, 'users');
  const [data, setData] = useState<any[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const userInfo = useRef<any>();
  const dispatch = useDispatch<AppDispatch>();
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
  const handleSubmit = async (data: Category) => {
    if (!data) return;

    const payload = {
      ...data,
      createdAt: data.createdAt || Timestamp.now(),
      createdBy: data.createdBy || user?.email || '',
      spent: data.spent ?? 0,
    };

    if (data.id) {
      await categoryService.updateSubCollectionDoc(
        userInfo.current.groups[0],
        'categories',
        data.id,
        payload,
      );
    } else {
      await categoryService.addSubCollectionDoc(userInfo.current.groups[0], 'categories', payload);
    }

    setOpen(false);
    setEditingCategory(undefined);
  };

  const handleDelete = (row: Category) => {
    dispatch(
      openConfirm({
        title: 'Delete Confirm',
        description: 'Are you sure to delete ' + row.name + '!',
        onConfirm: () => {
          categoryService.deleteSubCollectionDoc(userInfo.current.groups[0], 'categories', row.id);
        },
      }),
    );
  };

  const handleEdit = (row: Category) => {
    setEditingCategory(row);
    setOpen(true);
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
        <CustomTable
          columns={columns}
          data={data}
          selectable
          searchable
          rowActions={(row) => (
            <Box display="flex" gap={1}>
              <IconButton color="primary" onClick={() => handleEdit(row)} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(row)} size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        />
      </Paper>
      <RowFormModal<Category>
        open={open}
        initialData={editingCategory}
        fields={fields}
        onClose={() => setOpen(false)}
        onSubmit={(editingCategory) => handleSubmit(editingCategory)}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        confirmText={editingCategory ? 'Update' : 'Create'}
      />
    </Box>
  );
}
