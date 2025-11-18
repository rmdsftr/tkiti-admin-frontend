import CardStruktur from "../layouts/CardStruktur"
import "../styles/global.css"
import img from "../assets/scarlet (1).jpeg"
import "../styles/card-stuktur.css"

export default function StrukturPage(){
    return(
        <div className="struktur-page">
            <h1 className="page-title">Struktur TKITI 2025</h1>
            
            <div className="struktur-wrapper">
                {/* Pengurus Inti */}
                <section className="divisi-section">
                    <div className="divisi-header">
                        <h2>Pengurus Inti</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="card-grid">
                        <CardStruktur
                            gambar={img}
                            nama="Nabil Rizki Nafisa"
                            jabatan="Koordinator Asisten"
                        />
                        <CardStruktur
                            gambar={img}
                            nama="Rahma Aurelia Zami"
                            jabatan="Sekretaris"
                        />
                        <CardStruktur
                            gambar={img}
                            nama="Chalvina Suja Rahayu"
                            jabatan="Bendahara"
                        />
                    </div>
                </section>

                {/* Divisi Penelitian dan Pengembangan */}
                <section className="divisi-section">
                    <div className="divisi-header">
                        <h2>Divisi Penelitian dan Pengembangan</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="card-grid">
                        <CardStruktur
                            gambar={img}
                            nama="Ramadhani Safitri"
                            jabatan="Koordinator"
                        />
                        <CardStruktur
                            gambar={img}
                            nama="Muhammad Abrar Rayva"
                            jabatan="Anggota"
                        />
                        <CardStruktur
                            gambar={img}
                            nama="Trici Ayunda"
                            jabatan="Anggota"
                        />
                        <CardStruktur
                            gambar={img}
                            nama="Muhammad Abrar Rayva"
                            jabatan="Anggota"
                        />
                        <CardStruktur
                            gambar={img}
                            nama="Trici Ayunda"
                            jabatan="Anggota"
                        />
                    </div>
                </section>

                {/* Divisi Rumah Tangga */}
                <section className="divisi-section">
                    <div className="divisi-header">
                        <h2>Divisi Rumah Tangga</h2>
                        <div className="divider"></div>
                    </div>
                    <div className="card-grid">
                        <CardStruktur
                            gambar={img}
                            nama="Khalid Nauly Maturino"
                            jabatan="Koordinator"
                        />
                        <CardStruktur
                            gambar={img}
                            nama="Dimas Radithiya"
                            jabatan="Anggota"
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}