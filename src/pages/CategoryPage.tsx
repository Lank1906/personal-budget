import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import RowFormModal from '../components/FormModal';
import { openConfirm } from '../store/slices/confirmSlice';
import { Category, fields } from '../types/category';
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../store/slices/categorySlice';
import CategoryCard from '../components/CategoryCard';

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
      <Box>
        {category.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No categories available.
          </Typography>
        ) : (
          <Grid container spacing={0.2}>
            {category.map((cat) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
                <CategoryCard
                  category={cat}
                  onDelete={() => handleDelete(cat)}
                  onUpdate={() => handleEdit(cat)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
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
