import { FaCalendar, FaEye, FaPen } from "react-icons/fa"
import "../styles/card-artikel.css"

interface Props{
    gambar: string;
    judul: string;
    views: number;
    tanggal: string;
    penulis: string;
}

function CardArtikel({gambar, judul, views, tanggal, penulis} : Props){
    return(
        <div className="artikel-container">
            <img src={gambar} alt=""/>
            <h3>{judul}</h3>
            <div className="diket">
                <div className="fa">
                    <FaEye/>
                    <p>{views} views</p>
                </div>
                <div className="fa">
                    <FaCalendar/>
                    <p>{tanggal}</p>
                </div>
                <div className="fa">
                    <FaPen/>
                    <p>{penulis}</p>
                </div>
            </div>
        </div>
    )
}

export default CardArtikel