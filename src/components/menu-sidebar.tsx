import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';

interface Props {
  icon: React.ReactNode;
  menu: string;
  link: string;
}

function MenuSidebar({ icon, menu, link }: Props) {
  const location = useLocation();
  const isActive = location.pathname === link;
  const activeColor = '#11AEAF';
  const defaultColor = 'rgba(0, 0, 0, 0.7)';

  // Clone icon dengan props tambahan
  const iconWithColor = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        color: isActive ? activeColor : defaultColor,
        size: 18,
      })
    : icon;

  return (
    <Link to={link} className="menu-link">
      <div className={`menu ${isActive ? 'active' : ''}`}>
        <div className="menu-icon">
          {iconWithColor}
        </div>
        <span className="menu-text">
          {menu}
        </span>
      </div>
    </Link>
  );
}

export default MenuSidebar;