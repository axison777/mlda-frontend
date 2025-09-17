import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AppLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50 w-full">
      <Sidebar />
      <div className="flex-1 ml-70 w-full">
        <Header />
        <main className="pt-16 p-6 h-full overflow-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};