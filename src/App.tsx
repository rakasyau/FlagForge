import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { StarfieldCanvas } from './components/layout/StarfieldCanvas';
import { NavigationRail } from './components/layout/NavigationRail';
import { HeaderNav } from './components/layout/HeaderNav';
import { LandingView } from './components/views/LandingView';
import { DashboardView } from './components/views/DashboardView';
import { ModulesView } from './components/views/ModulesView';
import { PracticeView } from './components/views/PracticeView';
import { SandboxTerminalView } from './components/views/SandboxTerminalView';
import { ProfileView } from './components/views/ProfileView';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative min-h-screen bg-void text-txt-on-dark font-sans flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 selection:bg-flag selection:text-white">
      {/* Background Starfield Canvas */}
      <StarfieldCanvas />

      {/* Main Floating Outer Device Chassis (Inspired by the UI Reference) */}
      <div className="relative w-full max-w-[1440px] min-h-[92vh] bg-surface-dark-card/90 backdrop-blur-xl rounded-[32px] md:rounded-[40px] border border-white/15 shadow-device p-3 sm:p-5 md:p-6 flex flex-col z-10 overflow-hidden">
        
        {/* Device Header Bar */}
        <HeaderNav
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Main Body: Navigation Rail + Router Active View */}
        <div className="flex-1 flex gap-4 md:gap-6 pt-4 md:pt-6 overflow-hidden min-h-0">
          {/* Vertical Navigation Pill Rail */}
          <NavigationRail />

          {/* Router Outlet / Active View Container */}
          <main className="flex-1 overflow-y-auto pr-1 md:pr-2 scrollbar-thin">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingView />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes (Require MongoDB Auth) */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/modul"
                element={
                  <ProtectedRoute>
                    <ModulesView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/modul/:kategori"
                element={
                  <ProtectedRoute>
                    <ModulesView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/latihan"
                element={
                  <ProtectedRoute>
                    <PracticeView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/latihan/:kategori/:id"
                element={
                  <ProtectedRoute>
                    <PracticeView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/terminal"
                element={
                  <ProtectedRoute>
                    <SandboxTerminalView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileView />
                  </ProtectedRoute>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
};
