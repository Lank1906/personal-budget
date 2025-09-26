import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTable from '../components/CustomTable';
import { FirestoreService } from '../apis/serviceBase';
import { db } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import RowFormModal from '../components/FormModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Timestamp } from 'firebase/firestore';
import { openConfirm } from '../store/slices/confirmSlice';
import { Category, columns, fields } from '../types/type';

export default function CategoryPage() {
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const categoryService = new FirestoreService(db, 'groups');
  const [data, setData] = useState<any[]>([]);
  const [groupId, setGroupId] = useState<string>('');
  const { user, info } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const fetchData = async () => {
    const gid = info?.groups?.[0];
    if (!user?.email || !gid) return;

    const result = await categoryService.getSubCollectionDocs(gid, 'categories');
    if (result.success && result.data) {
      setData(result.data.docs);
      setGroupId(info.groups[0]);
    }
  };

  const handleSubmit = async (data: Category) => {
    if (!data || !groupId) return;

    const payload = {
      ...data,
      createdAt: data.createdAt || Timestamp.now(),
      createdBy: data.createdBy || user?.email || '',
      spent: data.spent ?? 0,
    };

    if (data.id) {
      await categoryService.updateSubCollectionDoc(groupId, 'categories', data.id, payload);
    } else {
      await categoryService.addSubCollectionDoc(groupId, 'categories', payload);
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
          categoryService.deleteSubCollectionDoc(groupId, 'categories', row.id);
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
