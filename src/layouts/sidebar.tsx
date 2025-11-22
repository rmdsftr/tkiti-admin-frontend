import { useState } from 'react';
import { FaHome, FaUser, FaRegNewspaper, FaCalendarAlt, FaSitemap, FaBars, FaTimes } from 'react-icons/fa';
import PhotoRound from '../components/photo-round';
import MenuSidebar from '../components/menu-sidebar';
import img from '../assets/scarlet (1).jpeg';
import '../styles/sidebar.css';

interface Props {
  nama: string;
  nolab: string;
}

function SidebarLayout({ nama, nolab }: Props) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { menu: "Dashboard", link: "/dashboard", icon: <FaHome /> },
    { menu: "Anggota", link: "/anggota", icon: <FaUser /> },
    { menu: "Artikel", link: "/artikel", icon: <FaRegNewspaper /> },
    { menu: "Kegiatan", link: "/kegiatan", icon: <FaCalendarAlt /> },
    { menu: "Struktur", link: "/struktur", icon: <FaSitemap /> }
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="mobile-toggle"
      >
        {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="mobile-overlay"
        />
      )}

      <div 
        className={`container ${isMobileOpen ? 'mobile-open' : ''}`}
        onClick={() => setIsMobileOpen(false)}
      >
        <div className="profil">
          <PhotoRound
            gambar={img}
            height={90}
            width={90}
          />
          <h3>{nama}</h3>
          <p>{nolab}</p>
        </div>

        <hr />

        <div className="list">
          {menuItems.map((item) => (
            <MenuSidebar
              key={item.link}
              icon={item.icon}
              menu={item.menu}
              link={item.link}
            />
          ))}
        </div>

      </div>
    </>
  );
}

export default SidebarLayout;