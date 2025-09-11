import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { logout as logoutAction } from '../store/slices/userSlice';
import { openConfirm } from '../store/slices/confirmSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FieldConfig } from '../types/form';
import { useState } from 'react';
import RowFormModal from '../components/FormModal';

const HomePage: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const categoryFields: FieldConfig[] = [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'name', label: 'Category Name', type: 'text' },
    { key: 'description', label: 'Description', type: 'text' },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: ['Active', 'Inactive'],
    },
  ];
  type Category = {
    id: number;
    name: string;
    description: string;
    status: string;
  };
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>();

  const handleAdd = () => {
    setEditingCategory(undefined);
    setOpen(true);
  };

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(
      openConfirm({
        title: 'Confirm',
        description: 'Are you sure to logout!',
        onConfirm: () =>
          dispatch(
            logoutAction({
              successFn: () => navigator('/login'),
            }),
          ),
      }),
    );
  };

  return (
    <>
      {user ? (
        <>
          <h1>Xin chào {user.email}</h1>
          <button onClick={handleLogout}>Đăng xuất</button>
          <button onClick={handleAdd}>add</button>
          <RowFormModal<Category>
            open={open}
            initialData={editingCategory}
            fields={categoryFields}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
            title={editingCategory ? 'Edit Category' : 'Add Category'}
            confirmText={editingCategory ? 'Update' : 'Create'}
          />
        </>
      ) : (
        <h1>Bạn chưa đăng nhập</h1>
      )}
    </>
  );
};

export default HomePage;
