import "../styles/global.css";
import DataTable from "../components/table";
import type { Column } from "../components/table";
import img from "../assets/scarlet (1).jpeg";
import Button from "../components/button";
import { FaPlus } from "react-icons/fa";


interface Member {
  id: number;
  image: string;
  name: string;
  nim: string;
  jumlahArtikel: number;
  role: 'Admin' | 'Member';
}

export default function AnggotaPage() {
  const sampleData: Member[] = [
    {
      id: 1,
      image: img,
      name: 'Budi Santoso',
      nim: '22/493845/TK/54321',
      jumlahArtikel: 21,
      role: 'Admin'
    },
    {
      id: 2,
      image: img,
      name: 'Siti Nurhaliza',
      nim: '22/493846/TK/54322',
      jumlahArtikel: 15,
      role: 'Member'
    },
    {
      id: 3,
      image: img,
      name: 'Ahmad Rifai',
      nim: '22/493847/TK/54323',
      jumlahArtikel: 8,
      role: 'Member'
    },
    {
      id: 4,
      image: img,
      name: 'Dewi Lestari',
      nim: '22/493848/TK/54324',
      jumlahArtikel: 32,
      role: 'Admin'
    },
    {
      id: 5,
      image: img,
      name: 'Rizky Pratama',
      nim: '22/493849/TK/54325',
      jumlahArtikel: 12,
      role: 'Member'
    },
    {
      id: 6,
      image: img,
      name: 'Putri Wulandari',
      nim: '22/493850/TK/54326',
      jumlahArtikel: 5,
      role: 'Member'
    },
    {
      id: 7,
      image: img,
      name: 'Andi Wijaya',
      nim: '22/493851/TK/54327',
      jumlahArtikel: 27,
      role: 'Admin'
    },
    {
      id: 8,
      image: img,
      name: 'Indah Permatasari',
      nim: '22/493852/TK/54328',
      jumlahArtikel: 18,
      role: 'Member'
    },
    {
      id: 9,
      image: img,
      name: 'Fajar Ramadhan',
      nim: '22/493853/TK/54329',
      jumlahArtikel: 3,
      role: 'Member'
    },
    {
      id: 10,
      image: img,
      name: 'Lina Marlina',
      nim: '22/493854/TK/54330',
      jumlahArtikel: 14,
      role: 'Member'
    }
  ];

  const handleArtikelClick = (member: Member) => {
    console.log(`Lihat artikel dari ${member.name}`);
    
    
  };

  const handleRoleChange = (member: Member) => {
    if (member.role === 'Member') {
      console.log(`Jadikan ${member.name} sebagai Admin`);
      
      
    } else {
      console.log(`Hapus ${member.name} dari Admin`);
      
      
    }
  };

  const columns: Column<Member>[] = [
    { key: 'image', label: 'Nama Aslab', sortable: false },
    { key: 'nim', label: 'NIM', sortable: true },
    { 
      key: 'jumlahArtikel', 
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
        const roleClass = value === 'Admin' ? 'status-admin' : 'status-member';
        return <span className={`status-badge ${roleClass}`}>{value}</span>;
      }
    },
    {
      key: 'action',
      label: 'Action',
      sortable: false,
      render: (_, row) => (
        <button
          onClick={() => handleRoleChange(row)}
          style={{
            padding: '6px 10px',
            fontSize: '11px',
            fontWeight: '500',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'inherit',
            ...(row.role === 'Member' 
              ? {
                  background: 'white',
                  color: '#11AEAF',
                  borderColor: '#11AEAF'
                }
              : {
                  background: 'white',
                  color: '#11AEAF',
                  borderColor: '#11AEAF'
                }
            )
          }}
          onMouseEnter={(e) => {
            if (row.role === 'Member') {
              e.currentTarget.style.background = '#11afaf0f';
            } else {
              e.currentTarget.style.background = '#11afaf0f';
            }
          }}
          onMouseLeave={(e) => {
            if (row.role === 'Member') {
              e.currentTarget.style.background = 'white';
            } else {
              e.currentTarget.style.background = 'white';
            }
          }}
        >
          {row.role === 'Member' ? 'Jadikan Admin' : 'Hapus dari Admin'}
        </button>
      )
    }
  ];

  return (
    <div>
        <div style={{paddingLeft: '20px'}}>
            <Button
                iconLeft= {<FaPlus/>}
                text="Tambah Anggota"
                variant="solid"
                size="large"
            />
        </div>
        <div style={{ padding: '20px', background: 'white', minHeight: '100vh' }}>
            <DataTable<Member>
                data={sampleData}
                columns={columns}
                itemsPerPage={10}
            />
        </div>
    </div>
  );
}