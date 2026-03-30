import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Sidebar from "./components/Sidebar";
import AgendaView from "./pages/AgendaView";
import DoctorsView from "./pages/DoctorsView";
import GalleryView from "./pages/GalleryView";
import ReportsView from "./pages/ReportsView";
import Home from "./pages/Home";
import theme from "./theme";

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: "20px", backgroundColor: "#111111", color: "#FFD700" }}>
        <Routes>
          <Route path="agenda" element={<AgendaView />} />
          <Route path="doctors" element={<DoctorsView />} />
          <Route path="gallery" element={<GalleryView />} />
          <Route path="reports" element={<ReportsView />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* rota pública */}
          <Route path="/" element={<Home />} />

          {/* rotas administrativas */}
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
