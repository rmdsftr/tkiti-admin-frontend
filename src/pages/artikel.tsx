import CardArtikel from "../layouts/CardArtikel"
import "../styles/global.css"
import img from "../assets/header.jpeg"
import { FaChevronDown, FaFilter } from "react-icons/fa";
import Filter from "../components/filter";
import { useState } from "react";
import FloatingButton from "../components/floating-button";
import Pagination from "../components/pagination";
import SearchBar from "../components/search";
import ReadArticleLayout from "../layouts/ReadArticle";

const artikelData = [
    {
        id: 1,
        gambar: img,
        judul: "Revolusi AI: ChatGPT-5 Resmi Diluncurkan dengan Kemampuan Multimodal Canggih",
        views: 12340,
        tanggal: "15 November 2025",
        penulis: "Budi Santoso"
    },
    {
        id: 2,
        gambar: img,
        judul: "5 Framework JavaScript Terpopuler 2025 yang Wajib Dikuasai Developer",
        views: 7884,
        tanggal: "14 November 2025",
        penulis: "Sarah Wijaya"
    },
    {
        id: 3,
        gambar: img,
        judul: "Quantum Computing: Google Berhasil Pecahkan Enkripsi RSA dalam 5 Menit",
        views: 8270,
        tanggal: "13 November 2025",
        penulis: "Ahmad Rizki"
    },
    {
        id: 4,
        gambar: img,
        judul: "Tutorial Lengkap: Membangun REST API dengan Node.js dan TypeScript",
        views: 5490,
        tanggal: "12 November 2025",
        penulis: "Rina Kusuma"
    },
    {
        id: 5,
        gambar: img,
        judul: "Cybersecurity 2025: 7 Ancaman Digital yang Harus Diwaspadai Perusahaan",
        views: 6234,
        tanggal: "11 November 2025",
        penulis: "Dimas Prasetyo"
    },
    {
        id: 6,
        gambar: img,
        judul: "Dari Nol hingga Hero: Roadmap Lengkap Menjadi Full Stack Developer",
        views: 9284,
        tanggal: "10 November 2025",
        penulis: "Lina Maharani"
    },
    {
        id: 7,
        gambar: img,
        judul: "Web3 dan Blockchain: Masa Depan Internet atau Hype Semata?",
        views: 4557,
        tanggal: "9 November 2025",
        penulis: "Faisal Rahman"
    },
    {
        id: 8,
        gambar: img,
        judul: "Machine Learning untuk Pemula: Prediksi Harga Saham dengan Python",
        views: 7263,
        tanggal: "8 November 2025",
        penulis: "Dewi Lestari"
    },
    {
        id: 9,
        gambar: img,
        judul: "Cloud Computing: Perbandingan AWS, Azure, dan Google Cloud Platform",
        views: 5673,
        tanggal: "7 November 2025",
        penulis: "Arief Budiman"
    },
    {
        id: 10,
        gambar: img,
        judul: "IoT Smart Home: Bikin Rumah Pintar dengan Raspberry Pi dan Arduino",
        views: 3726,
        tanggal: "6 November 2025",
        penulis: "Siti Nurhaliza"
    },
    {
        id: 11,
        gambar: img,
        judul: "Docker dan Kubernetes: Panduan Lengkap Container Orchestration",
        views: 4892,
        tanggal: "5 November 2025",
        penulis: "Budi Santoso"
    },
    {
        id: 12,
        gambar: img,
        judul: "React vs Vue vs Angular: Framework Mana yang Tepat untuk Project Anda?",
        views: 6543,
        tanggal: "4 November 2025",
        penulis: "Sarah Wijaya"
    },
    {
        id: 13,
        gambar: img,
        judul: "Database NoSQL: MongoDB vs Cassandra untuk Aplikasi Skala Besar",
        views: 3421,
        tanggal: "3 November 2025",
        penulis: "Ahmad Rizki"
    },
    {
        id: 14,
        gambar: img,
        judul: "GraphQL: Alternatif Modern Menggantikan REST API",
        views: 4156,
        tanggal: "2 November 2025",
        penulis: "Rina Kusuma"
    },
    {
        id: 15,
        gambar: img,
        judul: "Microservices Architecture: Best Practices untuk Enterprise Application",
        views: 5234,
        tanggal: "1 November 2025",
        penulis: "Dimas Prasetyo"
    },
    {
        id: 16,
        gambar: img,
        judul: "DevOps Culture: Transformasi Digital di Era Modern",
        views: 3987,
        tanggal: "31 Oktober 2025",
        penulis: "Lina Maharani"
    },
    {
        id: 17,
        gambar: img,
        judul: "Big Data Analytics: Mengolah Terabyte Data dengan Apache Spark",
        views: 4623,
        tanggal: "30 Oktober 2025",
        penulis: "Faisal Rahman"
    },
    {
        id: 18,
        gambar: img,
        judul: "Progressive Web Apps: Native App Experience di Browser",
        views: 3845,
        tanggal: "29 Oktober 2025",
        penulis: "Dewi Lestari"
    },
    {
        id: 19,
        gambar: img,
        judul: "Serverless Computing: Deploy Aplikasi Tanpa Kelola Server",
        views: 5129,
        tanggal: "28 Oktober 2025",
        penulis: "Arief Budiman"
    },
    {
        id: 20,
        gambar: img,
        judul: "5G Technology: Dampaknya pada Internet of Things dan Edge Computing",
        views: 4367,
        tanggal: "27 Oktober 2025",
        penulis: "Siti Nurhaliza"
    },
    {
        id: 21,
        gambar: img,
        judul: "TypeScript Deep Dive: Advanced Type System untuk JavaScript Developer",
        views: 6782,
        tanggal: "26 Oktober 2025",
        penulis: "Budi Santoso"
    },
    {
        id: 22,
        gambar: img,
        judul: "CI/CD Pipeline: Otomasi Deploy dari Development hingga Production",
        views: 3956,
        tanggal: "25 Oktober 2025",
        penulis: "Sarah Wijaya"
    },
    {
        id: 23,
        gambar: img,
        judul: "API Security: Protect Your Backend dari Common Vulnerabilities",
        views: 5421,
        tanggal: "24 Oktober 2025",
        penulis: "Ahmad Rizki"
    },
    {
        id: 24,
        gambar: img,
        judul: "Neural Networks Explained: Deep Learning untuk Computer Vision",
        views: 7123,
        tanggal: "23 Oktober 2025",
        penulis: "Rina Kusuma"
    },
    {
        id: 25,
        gambar: img,
        judul: "Distributed Systems: Membangun Aplikasi yang Scalable dan Reliable",
        views: 4598,
        tanggal: "22 Oktober 2025",
        penulis: "Dimas Prasetyo"
    }
];

export default function ArtikelPage(){
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPenulis, setSelectedPenulis] = useState("all");
    const [selectedUrutan, setSelectedUrutan] = useState("newest");
    
    const itemsPerPage = 10;

    
    const filteredByPenulis = artikelData.filter((artikel) => {
        if (selectedPenulis === "all") return true;
        return artikel.penulis === selectedPenulis;
    });

    
    const sortedData = [...filteredByPenulis].sort((a, b) => {
        if (selectedUrutan === "newest") {
            return new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
        } else if (selectedUrutan === "oldest") {
            return new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime();
        } else if (selectedUrutan === "popular") {
            return b.views - a.views;
        }
        return 0;
    });

    
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    
    const handleUrutanChange = (value: string) => {
        setSelectedUrutan(value);
        setCurrentPage(1); 
    };

    return(
        <div style={{ padding: '20px' }}>
            <FloatingButton/>
            
            <div style={{
                marginBottom: '20pt', 
                gap: '10px', 
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                <Filter
                    iconLeft={<FaFilter />}
                    iconRight={<FaChevronDown />}
                    options={[
                        { label: "Terpublikasi", value: "published" },
                        { label: "Draft", value: "draft" },
                    ]}
                    placeholder="Terpublikasi"
                    defaultValue="published"
                    onChange={handleUrutanChange}
                />
                <SearchBar/>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
                maxWidth: '1200px',
                marginBottom: '24px'
            }}>
                {currentData.map((artikel) => (
                    <CardArtikel
                        key={artikel.id}
                        gambar={artikel.gambar}
                        judul={artikel.judul}
                        views={artikel.views}
                        tanggal={artikel.tanggal}
                        penulis={artikel.penulis}
                    />
                ))}
            </div>

            {currentData.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#9ca3af'
                }}>
                    <p>Tidak ada artikel yang sesuai dengan filter</p>
                </div>
            )}

            {sortedData.length > itemsPerPage && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <ReadArticleLayout/>
        </div>
    )
}