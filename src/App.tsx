
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VendorDetails from "./pages/vendor";
import { PrimeReactProvider } from 'primereact/api';
import Login from "./pages/login";
import AddVendor from "./pages/addVendor";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          {/* Redirect category pages to home for now */}
          <Route path="/category/:categoryName" element={<Navigate to="/" />} />
          <Route path="/categories" element={<Navigate to="/" />} />
          {/* Redirect vendor pages to home for now */}
          <Route path="/vendors/:vendorId" element={<Navigate to="/" />} />
          <Route path="/vendors" element={<Navigate to="/" />} />
          {/* Redirect blog pages to home for now */}
          <Route path="/blog/:blogId" element={<Navigate to="/" />} />
          <Route path="/blog" element={<Navigate to="/" />} />


          <Route path="/addVendor" element={<AddVendor/>} />  
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
