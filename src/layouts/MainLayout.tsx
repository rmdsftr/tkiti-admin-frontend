import { Outlet } from 'react-router-dom';
import SidebarLayout from './sidebar';
import '../styles/main-layout.css';
import Watermark from '../components/watermark';

function MainLayout() {
  return (
    <div className="main-layout">
      <SidebarLayout nama="Ramadhani Safitri" nolab="TKITI.I.06" />

      <Watermark/>
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;