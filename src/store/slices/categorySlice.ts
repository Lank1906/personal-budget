import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirestoreService } from '../../apis/serviceBase';
import { db } from '../../firebase';
import { Category } from '../../types/category';
import { Timestamp } from 'firebase/firestore';

const service = new FirestoreService(db, 'groups');

const initialState: Category[] = [];

export const fetchCategories = createAsyncThunk('category/getAll', async (groupId: string) => {
  const result = await service.getSubCollectionDocs(groupId, 'categories');
  return result.success && result.data ? result.data.docs : [];
});

export const createCategory = createAsyncThunk(
  'category/create',
  async ({ groupId, category }: { groupId: string; category: Category }, { rejectWithValue }) => {
    try {
      const payload: Category = {
        ...category,
        createdAt: category.createdAt || Timestamp.now(),
        createdBy: category.createdBy || 'buuixuanhoangc@gmail.com',
        budget: category.budget ?? 0,
      };

      const result = await service.addSubCollectionDoc(groupId, 'categories', payload, undefined, {
        successMessage: 'Add category Completed!',
        errorMessage: 'Add category Failed!',
        disableToast: false,
      });

      if (result.success && !result.data) throw new Error('Add category failed');
      return { ...payload, id: result.data };
    } catch (err: any) {
      return rejectWithValue(err.message || 'Add category failed');
    }
  },
);

export const updateCategory = createAsyncThunk(
  'category/update',
  async ({ groupId, category }: { groupId: string; category: Category }, { rejectWithValue }) => {
    try {
      await service.updateSubCollectionDoc(
        groupId,
        'categories',
        category.id,
        category,
        undefined,
        {
          successMessage: 'Update Category Completed!',
          errorMessage: 'Update Category failed!',
          disableToast: false,
        },
      );
      return category;
    } catch (err: any) {
      rejectWithValue(err.message || 'Update category failed');
    }
  },
);

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async ({ groupId, categoryId }: { groupId: string; categoryId: string }, { rejectWithValue }) => {
    try {
      await service.deleteSubCollectionDoc(groupId, 'categories', categoryId, undefined, {
        successMessage: 'Delete Category Completed!',
        errorMessage: 'Delete Category Failed!',
        disableToast: false,
      });
      return categoryId;
    } catch (err: any) {
      rejectWithValue(err.message || 'Delete category failed');
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.push(action.payload);
        }
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        if (!action.payload) return;
        const idx = state.findIndex((c) => c.id === action.payload?.id);
        if (idx !== -1) state[idx] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        return state.filter((c) => c.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
