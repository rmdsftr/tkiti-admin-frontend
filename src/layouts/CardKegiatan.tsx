import { FaTrash } from "react-icons/fa"
import "../styles/card-kegiatan.css"

interface Props{
    kegiatanId: string;
    gambar: string;
    judul: string;
    deskripsi: string;
    tanggal: string;
    onDelete?: (kegiatanId: string) => void;
}

function CardKegiatan({kegiatanId, gambar, judul, deskripsi, tanggal, onDelete} : Props){
    const handleDelete = () => {
        // Konfirmasi sebelum hapus
        const confirmed = window.confirm(`Apakah Anda yakin ingin menghapus kegiatan "${judul}"?`);
        if (confirmed && onDelete) {
            onDelete(kegiatanId);
        }
    };

    return(
        <div className="kegiatan-container">
            <div className="icon">
                <div 
                    className="action" 
                    onClick={handleDelete}
                    style={{ cursor: 'pointer' }}
                    title="Hapus kegiatan"
                >
                    <FaTrash/>
                </div>
            </div>
            <div>
                <img src={gambar} alt="" className="gambar"/>
            </div>
            <div className="teks">
                <div>
                    <h3>{judul}</h3>
                    <p>{deskripsi}</p>
                </div>
                <p className="tanggal">{tanggal}</p>
            </div>
        </div>
    )
}

export default CardKegiatan