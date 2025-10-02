import { Box, Button, IconButton, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTable from '../components/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import RowFormModal from '../components/FormModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { openConfirm } from '../store/slices/confirmSlice';
import { Category, columns, fields } from '../types/category';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../store/slices/categorySlice';

export default function CategoryPage() {
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();
  const [groupId, setGroupId] = useState<string>('');
  const { info } = useSelector((state: RootState) => state.user);
  const category = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const gid = info?.groups?.[0];
    if (gid && category.length === 0) {
      setGroupId(gid);
      dispatch(fetchCategories(gid));
    }
  }, [info, dispatch]);

  const handleSubmit = async (data: Category) => {
    if (!data || !groupId) return;
    if (data.id) {
      await dispatch(updateCategory({ groupId, category: data }));
    } else {
      await dispatch(createCategory({ groupId, category: data }));
    }

    setOpen(false);
    setEditingCategory(undefined);
  };

  const handleDelete = (row: Category) => {
    dispatch(
      openConfirm({
        title: 'Delete Confirm',
        description: 'Are you sure to delete ' + row.name + '!',
        onConfirm: async () => {
          await dispatch(deleteCategory({ groupId, categoryId: row.id }));
        },
      }),
    );
  };

  const handleEdit = (row: Category) => {
    setEditingCategory(row);
    setOpen(true);
  };

  const handleAdd = () => {
    setEditingCategory(undefined);
    setOpen(true);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Category (20)
        </Typography>
        <Button variant="contained" color="success" onClick={handleAdd}>
          + Add Category
        </Button>
      </Box>
      <Paper elevation={2}>
        <CustomTable
          columns={columns}
          data={category}
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
