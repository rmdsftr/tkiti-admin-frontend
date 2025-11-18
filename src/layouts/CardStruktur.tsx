import "../styles/card-stuktur.css"

interface Props{
    gambar: string;
    nama: string;
    jabatan: string;
}

function CardStruktur({gambar, nama, jabatan} : Props){
    return(
        <div className="struktur-card">
            <div className="card-image-wrapper">
                <img src={gambar} alt={nama} />
                <div className="image-overlay"></div>
            </div>
            <div className="card-content">
                <h3 className="card-name">{nama}</h3>
                <p className="card-jabatan">{jabatan}</p>
            </div>
        </div>
    )
}

export default CardStruktur