import { FaPen, FaTrash } from "react-icons/fa"
import "../styles/card-kegiatan.css"

interface Props{
    gambar: string;
    judul: string;
    deskripsi: string;
    tanggal: string;
}

function CardKegiatan({gambar, judul, deskripsi, tanggal} : Props){
    return(
        <div className="kegiatan-container">
            <div className="icon">
                <div className="action">
                    <FaPen/>
                </div>
                <div className="action">
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