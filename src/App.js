import React, { useState } from "react";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProjectDetail, setShowProjectDetail] = useState(false);

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

if (!loggedIn) {
  return <Login onLogin={() => setLoggedIn(true)} />;
}
  return (
    <div className="dark h-screen bg-background text-foreground">
      <div className="flex h-full">
        <Sidebar
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
