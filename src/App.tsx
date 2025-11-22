import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import AnggotaPage from "./pages/anggota"
import MainLayout from "./layouts/MainLayout"
import ArtikelPage from "./pages/artikel"
import KegiatanPage from "./pages/kegiatan"
import StrukturPage from "./pages/struktur"
import LoginPage from "./pages/login"
import WriteArticlePage from "./pages/write"

function App(){
  return(
    <Routes>
      <Route 
        path="/" 
        element={
          <MainLayout />
        }
      >
        <Route path="dashboard" element={<HomePage/>} />
        <Route path="anggota" element={<AnggotaPage/>} />
        <Route path="artikel" element={<ArtikelPage/>} />
        <Route path="kegiatan" element={<KegiatanPage/>} />
        <Route path="struktur" element={<StrukturPage/>} />
        <Route path="write" element={<WriteArticlePage/>} />
      </Route>
      <Route index element={<LoginPage/>} />
    </Routes>
  )
}

export default App