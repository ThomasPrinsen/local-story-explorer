import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LocalStories from './components/LocalStories';
import StoryDetail from './components/StoryDetail';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import VerhaalDelen from "./pages/VerhaalDelen";
import NotFound from "./pages/NotFound";
import MapView from "./components/MapView";
import BudgetTips from "./pages/BudgetTips";
import DosAndDonts from "./pages/DosAndDonts";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/verhalen" replace />} />
              <Route path="/verhalen" element={<LocalStories />} />
              <Route path="/verhaal/:id" element={<StoryDetail />} />
              <Route path="/verhaal-delen" element={<VerhaalDelen />} />
              <Route path="/kaart" element={<MapView />} />
              <Route path="/budget-tips" element={<BudgetTips />} />
              <Route path="/dos-and-donts" element={<DosAndDonts />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
