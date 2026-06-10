import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';
import Login from './views/Login.jsx';
import Dashboard from './views/Dashboard.jsx';
import CourseViewer from './views/CourseViewer.jsx';

/** Protege las rutas del campus: sin sesión → /login. */
function RequireAuth() {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProgressProvider>
          <ToastProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<RequireAuth />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/curso/:slug" element={<CourseViewer />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </ProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
