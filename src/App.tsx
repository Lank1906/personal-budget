import './App.css';
import AppRouter from './routers';
import './i18n';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
