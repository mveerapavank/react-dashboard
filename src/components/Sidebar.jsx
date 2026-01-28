import React from "react";
import { cn } from "./ui/utils";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Bell,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import telanganaLogo from "../assets/telangana-logo.png";
import awsIntelLogo from "../assets/aws-intel-logo.png";
import startupindiaLogo from "../assets/startup-india-logo.png";
import xynergyLogo from "../assets/xynergy-logo.png";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const recognizedLogos = [telanganaLogo, awsIntelLogo, startupindiaLogo];

export function Sidebar({
  activeSection,
  onSectionChange,
  collapsed,
  onToggleCollapse,
}) {
  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Header */}
        <div className="border-b border-sidebar-border">
          <div className="flex items-center justify-between p-4">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-sidebar-foreground">
                    Akin Analytics
                  </h1>
                  <p className="text-xs text-sidebar-foreground/60">
                    Enterprise Platform
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="text-sidebar-foreground hover:bg-sidebar-accent"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              const buttonContent = (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11 transition-all duration-200",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="w-5 h-5" />
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </Button>
              );

              return collapsed ? (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
                  <TooltipContent side="right" sideOffset={10}>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                buttonContent
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-sidebar-border">
            {/* Powered By */}
            <div className="px-4 py-8 border-b border-sidebar-border/50">
              <div className="flex flex-col items-center space-y-3">
                <div className="text-xs text-sidebar-foreground/60">
                  Powered By
                </div>
                <img
                  src={xynergyLogo}
                  alt="XYNERGY Logo"
                  className="w-full h-auto object-contain px-2"
                />
              </div>
            </div>

            {/* Recognized By - Horizontal Scrolling Logos */}
            <div className="px-4 py-8 overflow-hidden">
              <div className="text-xs text-sidebar-foreground/60 text-center mb-4">
                Recognized By
              </div>
              <div className="flex items-center space-x-4 animate-scroll">
                {[...recognizedLogos, ...recognizedLogos].map((logo, index) => (
                  <img
                    key={index}
                    src={logo}
                    alt="Partner logo"
                    className="h-12 object-contain flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS for scrolling animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 15s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </TooltipProvider>
  );
}
