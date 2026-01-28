import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Bell, CheckCircle2, AlertTriangle, Info } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "success",
    icon: CheckCircle2,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    title: "Project Completed",
    message:
      "Solar Farm Inspection project has been successfully completed",
    time: "5 minutes ago",
    unread: true,
  },
  {
    id: 2,
    type: "warning",
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    title: "Quality Review Required",
    message:
      "Bridge Assessment Project requires immediate quality review",
    time: "15 minutes ago",
    unread: true,
  },
  {
    id: 3,
    type: "info",
    icon: Info,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    title: "New Project Assigned",
    message:
      "You have been assigned to Urban Traffic Analysis Phase 2",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 4,
    type: "info",
    icon: Info,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    title: "Report Generated",
    message:
      "Highway Infrastructure Survey report is ready for download",
    time: "3 hours ago",
    unread: false,
  },
];

export function NotificationDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-500" />
            <span>Notifications</span>
            <Badge className="ml-auto bg-destructive text-destructive-foreground">
              3
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Get notified when a new message arrives or when someone comments on
            your project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4 max-h-96 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors hover:bg-muted/50 ${
                  notification.unread
                    ? "bg-muted/30 border-border"
                    : "bg-card border-border/50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon
                      className={`w-5 h-5 ${notification.color}`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
