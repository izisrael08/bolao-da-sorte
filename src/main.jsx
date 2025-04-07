import { createRoot } from 'react-dom/client';
import App from './App';
import AdminApp from './admin/AdminApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  </BrowserRouter>
);