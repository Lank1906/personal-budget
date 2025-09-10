import './App.css';
import AppRouter from './routers';
import './i18n';
import { ToastContainer } from 'react-toastify';
import ConfirmDialog from './components/ConfirmDialog';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
      <ConfirmDialog />
    </>
  );
}

export default App;
