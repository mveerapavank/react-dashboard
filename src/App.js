import React, { useState, useEffect } from "react";

import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Projects } from "./components/Projects";
import { Reports } from "./components/Reports";
import { Alerts } from "./components/Alerts";
import { Analytics } from "./components/Analytics";
import { ProjectDetail } from "./components/ProjectDetail";
import { Header } from "./components/Header";
import Login from "./pages/Login";

export default function App() {
  const [auth, setAuth] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProjectDetail, setShowProjectDetail] = useState(false);

  // ✅ AUTH GUARD (runs once on app load)
useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuth(null);
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      setAuth({
        token,
        role: payload.role,
        user: payload.sub,
      });
    } catch {
      localStorage.removeItem("token");
      setAuth(null);
    }
  };

  checkAuth();

  window.addEventListener("storage", checkAuth);

  return () => window.removeEventListener("storage", checkAuth);
}, []);



  const renderContent = () => {
    if (showProjectDetail) {
      return <ProjectDetail onBack={() => setShowProjectDetail(false)} />;
    }

    switch (activeSection) {
      case "dashboard":
        return <Dashboard onProjectClick={() => setShowProjectDetail(true)} />;
      case "projects":
        return (
          <Projects
            onNavigateToAnalytics={() => setActiveSection("analytics")}
          />
        );
      case "reports":
        return <Reports />;
      case "alerts":
        return <Alerts />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard onProjectClick={() => setShowProjectDetail(true)} />;
    }
  };

  // ✅ If NOT authenticated → Login only
  if (!auth) {
  return <Login onLogin={(data) => setAuth(data)} />;
}

  // ✅ If authenticated → Full app
  return (
    <div className="dark h-screen bg-background text-foreground">
      <div className="flex h-full">
        <Sidebar
          role={auth.role}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        <main
          className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
            sidebarCollapsed ? "ml-16" : "ml-64"
          }`}
        >
          <Header
            activeSection={activeSection}
            onToggleSidebar={() =>
              setSidebarCollapsed(!sidebarCollapsed)
            }
          />

          <div className="flex-1 overflow-auto bg-background p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
