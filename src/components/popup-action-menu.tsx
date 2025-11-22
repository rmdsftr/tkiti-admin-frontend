import { useState } from 'react';
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { FiSettings } from 'react-icons/fi';
import '../styles/popup-action-menu.css';

interface Member {
  nim: string;
  nama: string;
  jumlah_artikel: number;
  role: 'admin' | 'member';
  status: 'aktif' | 'nonaktif';
}

interface MemberActionMenuProps {
  member: Member;
  onAction: (action: string, member: Member) => void;
}

interface MenuOption {
  label: string;
  action: string;
  isDanger?: boolean;
}

export default function MemberActionMenu({ member, onAction }: MemberActionMenuProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const open = Boolean(anchor);

  
  const getMenuOptions = (): MenuOption[] => {
    const { role, status } = member;

    if (role === 'admin' && status === 'aktif') {
      return [
        { label: 'Hapus dari admin', action: 'remove_admin' },
        { label: 'Nonaktifkan Akun', action: 'deactivate' },
        { label: 'Hapus Akun', action: 'delete', isDanger: true }
      ];
    }

    if (role === 'admin' && status === 'nonaktif') {
      return [
        { label: 'Hapus dari admin', action: 'remove_admin' },
        { label: 'Aktifkan Akun', action: 'activate' },
        { label: 'Hapus Akun', action: 'delete', isDanger: true }
      ];
    }

    if (role === 'member' && status === 'aktif') {
      return [
        { label: 'Jadikan Admin', action: 'make_admin' },
        { label: 'Nonaktifkan Akun', action: 'deactivate' },
        { label: 'Hapus Akun', action: 'delete', isDanger: true }
      ];
    }
 
    if (role === 'member' && status === 'nonaktif') {
      return [
        { label: 'Jadikan Admin', action: 'make_admin' },
        { label: 'Aktifkan Akun', action: 'activate' },
        { label: 'Hapus Akun', action: 'delete', isDanger: true }
      ];
    }

    return [
        { label: 'Jadikan Admin', action: 'make_admin' },
        { label: 'Nonaktifkan Akun', action: 'deactivate' },
        { label: 'Hapus Akun', action: 'delete', isDanger: true }
      ];
  };

  const handleOptionClick = (action: string) => {
    onAction(action, member);
    setAnchor(null);
  };

  const options = getMenuOptions();

  return (
    <>
      <button
        onClick={handleClick}
        className={`action-menu-trigger ${open ? 'active' : ''}`}
      >
        <FiSettings size={17} />
      </button>

      <Popup 
        open={open} 
        anchor={anchor}
        offset={5}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div className="action-menu-dropdown">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.action)}
                className={`action-menu-item ${option.isDanger ? 'danger' : ''} ${index > 0 ? 'bordered' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </ClickAwayListener>
      </Popup>
    </>
  );
}