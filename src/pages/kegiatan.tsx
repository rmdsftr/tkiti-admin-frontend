import { useState } from "react";
import CardKegiatan from "../layouts/CardKegiatan"
import "../styles/global.css"
import img from "../assets/header.jpeg"
import Button from "../components/button"
import { FaChevronDown, FaFilter, FaPlus } from "react-icons/fa"
import Filter from "../components/filter"
import Pagination from "../components/pagination";

const kegiatanData = [
    {
        id: 1,
        gambar: img,
        judul: "TKITI mengadakan workshop mengenai sistem operasi",
        deskripsi: "Workshop ini akan membahas fundamental sistem operasi Linux, mulai dari instalasi hingga konfigurasi server. Peserta akan belajar command line, file management, dan networking basics.",
        tanggal: "12 Oktober 2025",
        kategori: "workshop"
    },
    {
        id: 2,
        gambar: img,
        judul: "Seminar Nasional Teknologi Informasi 2025",
        deskripsi: "Seminar dengan tema 'AI dan Machine Learning untuk Masa Depan Indonesia' menghadirkan pembicara dari industri dan akademisi terkemuka. Gratis untuk mahasiswa dengan registrasi online.",
        tanggal: "25 Oktober 2025",
        kategori: "upgrading"
    },
    {
        id: 3,
        gambar: img,
        judul: "Hackathon Kampus: Build Your Dream App",
        deskripsi: "Kompetisi pembuatan aplikasi 48 jam non-stop! Terbuka untuk semua jurusan. Hadiah total 30 juta rupiah untuk juara 1, 2, dan 3. Tim maksimal 4 orang.",
        tanggal: "5 November 2025",
        kategori: "workshop"
    },
    {
        id: 4,
        gambar: img,
        judul: "Pelatihan Web Development dengan React & TypeScript",
        deskripsi: "Belajar membuat web modern menggunakan React dan TypeScript dari dasar. Materi mencakup component, hooks, state management, dan deployment. Sertifikat untuk peserta yang menyelesaikan project akhir.",
        tanggal: "18 November 2025",
        kategori: "workshop"
    },
    {
        id: 5,
        gambar: img,
        judul: "Tech Talk: Career Path in Software Engineering",
        deskripsi: "Diskusi santai bersama senior software engineer dari startup unicorn tentang perjalanan karir, tips interview, dan skill yang dibutuhkan di industri tech. Sesi Q&A dan networking.",
        tanggal: "2 Desember 2025",
        kategori: "upgrading"
    },
    {
        id: 6,
        gambar: img,
        judul: "Workshop Cyber Security & Ethical Hacking",
        deskripsi: "Pelajari dasar-dasar keamanan siber, teknik penetration testing, dan cara melindungi sistem dari serangan. Praktik langsung dengan tools industry standard.",
        tanggal: "15 Desember 2025",
        kategori: "workshop"
    },
    {
        id: 7,
        gambar: img,
        judul: "Lomba Desain UI/UX Competition 2025",
        deskripsi: "Kompetisi desain interface dan user experience untuk aplikasi mobile. Tema: 'Aplikasi Pendidikan untuk Gen Z'. Pendaftaran gratis, hadiah menarik menanti!",
        tanggal: "8 Januari 2026",
        kategori: "maintainance"
    },
    {
        id: 8,
        gambar: img,
        judul: "Bootcamp Mobile App Development with Flutter",
        deskripsi: "Intensive bootcamp 2 minggu belajar Flutter dari nol hingga publish app di Play Store. Mentor berpengalaman, materi lengkap, dan project portfolio guaranteed.",
        tanggal: "20 Januari 2026",
        kategori: "workshop"
    },
    {
        id: 9,
        gambar: img,
        judul: "TKITI Tech Fest 2026: Innovation Exhibition",
        deskripsi: "Pameran inovasi teknologi mahasiswa!展示 project IoT, AI, robotics, dan software. Kompetisi best innovation, demo booth, dan networking dengan investor.",
        tanggal: "10 Februari 2026",
        kategori: "upgrading"
    },
    {
        id: 10,
        gambar: img,
        judul: "Workshop Git & GitHub untuk Kolaborasi Tim",
        deskripsi: "Kuasai version control system yang wajib dikuasai programmer! Belajar git workflow, branching strategy, merge conflict resolution, dan best practices untuk kerja tim.",
        tanggal: "28 Februari 2026",
        kategori: "maintainance"
    }
];

export default function KegiatanPage(){
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedKategori, setSelectedKategori] = useState("all");
    
    const itemsPerPage = 8;

    // Filter data berdasarkan kategori
    const filteredData = kegiatanData.filter((kegiatan) => {
        if (selectedKategori === "all") return true;
        return kegiatan.kategori === selectedKategori;
    });

    // Hitung total pages
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Get data untuk halaman saat ini
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Reset ke halaman 1 saat filter berubah
    const handleFilterChange = (value: string) => {
        setSelectedKategori(value);
        setCurrentPage(1);
    };

    return(
        <div style={{padding: '20px', width: '100%'}}>
            <div style={{
                marginBottom: '20pt', 
                width: '100%', 
                display: 'flex',  
                justifyContent: 'space-between',
                alignItems: 'center'  
            }}>
                <Button
                    iconLeft={<FaPlus/>}
                    text="Tambah Kegiatan"
                    variant="solid"
                    size="large"
                />
                <Filter
                    iconLeft={<FaFilter />}
                    iconRight={<FaChevronDown />}
                    options={[
                        { label: "Semua Kategori", value: "all" },
                        { label: "Workshop", value: "workshop" },
                        { label: "Upgrading", value: "upgrading" },
                        { label: "Maintainance", value: "maintainance" }
                    ]}
                    placeholder="Pilih Kategori"
                    defaultValue="all"
                    onChange={handleFilterChange}
                />
            </div>

            <div style={{ marginBottom: '24px' }}>
                {currentData.map((kegiatan) => (
                    <CardKegiatan
                        key={kegiatan.id}
                        gambar={kegiatan.gambar}
                        judul={kegiatan.judul}
                        deskripsi={kegiatan.deskripsi}
                        tanggal={kegiatan.tanggal}
                    />
                ))}
            </div>

            {/* Empty State */}
            {currentData.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#9ca3af'
                }}>
                    <p>Tidak ada kegiatan yang sesuai dengan filter</p>
                </div>
            )}

            {/* Pagination */}
            {filteredData.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    )
}