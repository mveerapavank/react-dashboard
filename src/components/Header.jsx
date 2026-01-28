import React, { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Menu, Upload, Bell, Settings, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { UploadDialog } from "./UploadDialog";
import { NotificationDialog } from "./NotificationDialog";
import { SettingsDialog } from "./SettingsDialog";

const sectionTitles = {
  dashboard: "Dashboard",
  projects: "",
  reports: "",
  alerts: "",
  analytics: "",
};

export function Header({ activeSection, onToggleSidebar }) {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  const currentTitle = sectionTitles[activeSection];

  return (
    <>
      <header className="h-20 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="md:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {currentTitle && (
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {currentTitle}
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back to your analytics platform
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Upload Files */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUploadDialogOpen(true)}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            onClick={() => setNotificationDialogOpen(true)}
          >
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs">
              3
            </Badge>
          </Button>

          {/* Settings */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSettingsDialogOpen(true)}
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center space-x-2 hover:bg-accent" variant="ghost">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    AK
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">Akin Platform</div>
                  <div className="text-xs text-muted-foreground">
                    Administrator
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSettingsDialogOpen(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Dialogs */}
      <UploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
      />
      <NotificationDialog
        open={notificationDialogOpen}
        onOpenChange={setNotificationDialogOpen}
      />
      <SettingsDialog
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
      />
    </>
  );
}
