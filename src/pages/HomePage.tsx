import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { logout as logoutAction } from '../store/slices/userSlice';
import { openConfirm } from '../store/slices/confirmSlice';
import { useDispatch, useSelector } from 'react-redux';

const HomePage: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

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
        </>
      ) : (
        <h1>Bạn chưa đăng nhập</h1>
      )}
    </>
  );
};

export default HomePage;
