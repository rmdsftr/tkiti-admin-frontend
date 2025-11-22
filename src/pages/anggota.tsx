import { useState, useEffect } from "react";
import "../styles/global.css";
import DataTable from "../components/table";
import type { Column } from "../components/table";
import img from "../assets/scarlet (1).jpeg";
import Button from "../components/button";
import { FaPlus } from "react-icons/fa";
import { userService } from "../services/user.service";
import MemberActionMenu from "../components/popup-action-menu";
import Snackbar from "../components/snackbar";
import { useSnackbar } from "../hooks/snackbar";
import ConfirmDialog from "../components/dialog";
import { useConfirmDialog } from "../hooks/dialog";
import AddMemberModal from "../layouts/FormAddMember";
import type { MemberFormData } from "../layouts/FormAddMember";
import api from "../services/api";
import SearchBar from "../components/search";

interface Member {
  id?: string | number;
  nim: string;
  nama: string;
  name?: string;
  jumlah_artikel: number;
  role: 'admin' | 'member';
  status: 'aktif' | 'nonaktif';
}

export default function AnggotaPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { snackbar, showSuccess, showError, closeSnackbar } = useSnackbar();
  const { dialog, showConfirm, closeDialog, handleConfirm } = useConfirmDialog();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      console.log('Response dari backend:', response);
      
      
      if (!response.data || !Array.isArray(response.data)) {
        console.warn('Data kosong atau format tidak valid');
        setMembers([]);
        setError(null);
        return;
      }
      
      const transformedData = response.data.map((item: Member) => ({
        ...item,
        id: item.nim, 
        name: item.nama 
      }));
      
      console.log('Data setelah transform:', transformedData);
      setMembers(transformedData);
      setError(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Gagal memuat data anggota';
      setError(errorMessage);
      console.error('Error fetching members:', err);
      console.error('Error response:', err.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleArtikelClick = (member: Member) => {
    console.log(`Lihat artikel dari ${member.nama}`);
  };

  const handleAddMember = async (formData: MemberFormData) => {
    try {
      await api.post('/admin', formData);
      await fetchMembers();
      showSuccess('Anggota berhasil ditambahkan!');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Gagal menambahkan anggota';
      showError(errorMessage);
      throw err; 
    }
  };

  const handleMemberAction = async (action: string, member: Member) => {
    console.log(`Action: ${action} untuk ${member.nama}`);
    
    try {
      let successMessage = '';

      switch (action) {
        case 'make_admin':
          await api.patch(`/admin/${member.nim}/admin`);
          successMessage = `${member.nama} berhasil dijadikan admin`;
          break;
        case 'remove_admin':
          await api.patch(`/admin/${member.nim}/member`);
          successMessage = `${member.nama} berhasil dijadikan member`;
          break;
        case 'activate':
          await api.patch(`/admin/${member.nim}/aktif`);
          successMessage = `${member.nama} berhasil diaktifkan`;
          break;
        case 'deactivate':
          await api.patch(`/admin/${member.nim}/nonaktif`);
          successMessage = `${member.nama} berhasil dinonaktifkan`;
          break;
        case 'delete':
          showConfirm(
            'Hapus Anggota',
            `Apakah Anda yakin ingin menghapus akun ${member.nama}? Tindakan ini tidak dapat dibatalkan.`,
            async () => {
              try {
                await api.delete(`/admin/${member.nim}`);
                await fetchMembers();
                showSuccess(`Akun ${member.nama} berhasil dihapus`);
              } catch (err: any) {
                const errorMessage = err.response?.data?.error || 'Gagal menghapus akun';
                showError(errorMessage);
              }
            },
            {
              confirmText: 'Ya, Hapus',
              cancelText: 'Batal',
              type: 'danger'
            }
          );
          return;
        default:
          return;
      }
      
      
      await fetchMembers();
      
      
      showSuccess(successMessage);
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Gagal melakukan action';
      showError(errorMessage);
      console.error('Error action:', err);
    }
  };

  const columns: Column<Member>[] = [
    { 
      key: 'nama', 
      label: 'Nama Aslab', 
      sortable: false,
      render: (value) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={img} 
            alt={value as string}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
          <span>{value}</span>
        </div>
      )
    },
    { key: 'nim', label: 'NIM', sortable: true },
    { 
      key: 'jumlah_artikel', 
      label: 'Jumlah Artikel', 
      sortable: true,
      render: (value, row) => (
        <button 
          onClick={() => handleArtikelClick(row)}
          style={{
            background: 'none',
            border: 'none',
            color: '#11AEAF',
            cursor: 'pointer',
            fontSize: '12px',
            textDecoration: 'underline',
            padding: 0,
            fontFamily: 'inherit'
          }}
        >
          {value} Artikel
        </button>
      )
    },
    { 
      key: 'role', 
      label: 'Role', 
      sortable: true,
      render: (value) => {
        const roleClass = value === 'admin' ? 'status-admin' : 'status-admin';
        return <span className={`status-badge ${roleClass}`}>{value}</span>;
      }
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (value) => {
        const statusClass = value === 'aktif' ? 'status-active' : 'status-inactive';
        return <span className={`status-badge ${statusClass}`}>{value}</span>;
      }
    },
    {
      key: 'action',
      label: 'Action',
      sortable: false,
      render: (_, row) => (
        <MemberActionMenu
          member={row}
          onAction={handleMemberAction}
        />
      )
    }
  ];

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '16px',
        color: '#666'
      }}>
        Memuat data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '16px',
        color: '#ef4444'
      }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <div style={{paddingLeft: '20px', display: 'flex', gap: '10px'}}>
        <Button
          iconLeft={<FaPlus/>}
          text="Tambah Anggota"
          variant="solid"
          size="large"
          onClick={() => setIsAddModalOpen(true)}
        />
        <SearchBar/>
      </div>
      <div style={{ padding: '20px', background: 'white'}}>
        {members.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            color: '#9ca3af'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px'
            }}>
              🗿
            </div>
            <p style={{
              fontSize: '16px',
              fontWeight: '500',
              color: '#6b7280',
              margin: '0 0 8px 0'
            }}>
              Belum ada anggota
            </p>
            <p style={{
              fontSize: '14px',
              color: '#9ca3af',
              margin: 0
            }}>
              Klik "Tambah Anggota" untuk menambahkan anggota baru
            </p>
          </div>
        ) : (
          <DataTable<Member>
            data={members}
            columns={columns}
            itemsPerPage={10}
          />
        )}
      </div>

      <Snackbar
        message={snackbar.message}
        type={snackbar.type}
        isOpen={snackbar.isOpen}
        onClose={closeSnackbar}
      />

      <ConfirmDialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        confirmText={dialog.confirmText}
        cancelText={dialog.cancelText}
        type={dialog.type}
        onConfirm={handleConfirm}
        onCancel={closeDialog}
      />

      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMember}
      />
    </div>
  );
}