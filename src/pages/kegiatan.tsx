import { useState, useEffect } from "react";
import CardKegiatan from "../layouts/CardKegiatan"
import "../styles/global.css"
import Button from "../components/button"
import { FaPlus } from "react-icons/fa"
import Pagination from "../components/pagination";
import FormAddEvent from "../layouts/FormAddEvent";
import Snackbar from "../components/snackbar";
import ConfirmDialog from "../components/dialog";
import api from "../services/api";
import { useSnackbar } from "../hooks/snackbar";
import { useConfirmDialog } from "../hooks/dialog";
import SearchBar from "../components/search";

interface Kegiatan {
    kegiatan_id: string;
    judul: string;
    deskripsi: string;
    photo_url: string;
    created_at: string;
    updated_at: string;
}

export default function KegiatanPage(){
    const [currentPage, setCurrentPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [kegiatanData, setKegiatanData] = useState<Kegiatan[]>([]);
    const [loading, setLoading] = useState(true);
    const { snackbar, showSuccess, showError, closeSnackbar } = useSnackbar();
    const { dialog, showConfirm, closeDialog, handleConfirm } = useConfirmDialog();
    
    const itemsPerPage = 8;

    
    useEffect(() => {
        fetchKegiatan();
    }, []);

    const fetchKegiatan = async () => {
        try {
            setLoading(true);
            const response = await api.get('/kegiatan');
            setKegiatanData(response.data.data || []);
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Gagal memuat data kegiatan';
            showError(errorMessage);
            setKegiatanData([]);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(kegiatanData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = kegiatanData.slice(startIndex, startIndex + itemsPerPage);

    const handleOpenForm = () => {
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
    };

    const handleSubmitForm = async (data: any) => {
        try {
            
            const formData = new FormData();
            formData.append('judul', data.judul);
            formData.append('deskripsi', data.deskripsi);
            
            
            if (data.photo_url) {
                formData.append('photo_url', data.photo_url);
            }

            await api.post('/kegiatan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            
            showSuccess('Kegiatan baru berhasil ditambahkan!');
            setIsFormOpen(false);
            
            fetchKegiatan();
        } catch (err: any) {
            const errorMessage = err.response?.data?.error || 'Gagal menambahkan kegiatan baru';
            showError(errorMessage);
        }
    };

    const handleDeleteKegiatan = async (kegiatanId: string) => {
        
        const kegiatan = kegiatanData.find(k => k.kegiatan_id === kegiatanId);
        const judulKegiatan = kegiatan?.judul || 'kegiatan ini';

        showConfirm(
            'Hapus Kegiatan',
            `Apakah Anda yakin ingin menghapus kegiatan "${judulKegiatan}"? Tindakan ini tidak dapat dibatalkan.`,
            async () => {
                try {
                    await api.delete(`/kegiatan/${kegiatanId}`);
                    showSuccess('Kegiatan berhasil dihapus!');
                    
                    fetchKegiatan();
                    
                    if (currentData.length === 1 && currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }
                } catch (err: any) {
                    const errorMessage = err.response?.data?.error || 'Gagal menghapus kegiatan';
                    showError(errorMessage);
                }
            },
            {
                confirmText: 'Ya, Hapus',
                cancelText: 'Batal',
                type: 'danger'
            }
        );
    };

    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div style={{
                padding: '20px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
            }}>
                <p style={{ color: '#9ca3af' }}>Memuat data...</p>
            </div>
        );
    }

    return(
        <div style={{padding: '20px', width: '100%'}}>
            <div style={{
                marginBottom: '20pt', 
                width: '100%', 
                display: 'flex',  
                alignItems: 'center',
                gap: '10px'  
            }}>
                <Button
                    iconLeft={<FaPlus/>}
                    text="Tambah Kegiatan"
                    variant="solid"
                    size="large"
                    onClick={handleOpenForm} 
                />
                <SearchBar/>
            </div>

            <div style={{ marginBottom: '24px' }}>
                {currentData.map((kegiatan) => (
                    <CardKegiatan
                        key={kegiatan.kegiatan_id}
                        kegiatanId={kegiatan.kegiatan_id}
                        gambar={kegiatan.photo_url}
                        judul={kegiatan.judul}
                        deskripsi={kegiatan.deskripsi}
                        tanggal={formatDate(kegiatan.created_at)}
                        onDelete={handleDeleteKegiatan}
                    />
                ))}
            </div>

            {currentData.length === 0 && (
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
                    Belum ada kegiatan
                    </p>
                    <p style={{
                    fontSize: '14px',
                    color: '#9ca3af',
                    margin: 0
                    }}>
                    Klik "Tambah Kegiatan" untuk menambahkan kegiatan baru
                    </p>
                </div>
            )}

            {kegiatanData.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {isFormOpen && (
                <FormAddEvent
                    onClose={handleCloseForm}
                    onSubmit={handleSubmitForm}
                />
            )}

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
        </div>
    )
}