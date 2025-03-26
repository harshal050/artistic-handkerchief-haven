
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import Gallery from "./pages/Gallery";
import { ProductDetail } from "./pages/ProductDetail";
import { NotFound } from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { ThemeProvider } from "./context/ThemeContext";
import { DatabaseProvider } from "./context/DatabaseContext";
import { Toaster } from "./components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <DatabaseProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <SonnerToaster position="top-center" />
      </DatabaseProvider>
    </ThemeProvider>
  );
}

export default App;
