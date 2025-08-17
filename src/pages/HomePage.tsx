import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import { logout } from '../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const HomePage: React.FC = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <>
      {user ? (
        <>
          <h1>Xin chào {user.email}</h1>
          <button onClick={() => dispatch(logout({ successFn: () => navigator('/login') }))}>
            Đăng xuất
          </button>
        </>
      ) : (
        <h1>Bạn chưa đăng nhập</h1>
      )}
    </>
  );
};

export default HomePage;
