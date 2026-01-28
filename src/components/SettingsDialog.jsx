import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Settings } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

export function SettingsDialog({ open, onOpenChange }) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-500" />
            <span>Settings</span>
          </DialogTitle>
          <DialogDescription>
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* PROFILE TAB */}
          <TabsContent value="profile" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                defaultValue="Akin Platform"
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                defaultValue="admin@akinanalytics.com"
                type="email"
                className="bg-input-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Input
                defaultValue="Administrator"
                disabled
                className="bg-input-background"
              />
            </div>

            <Button className="w-full">Save Changes</Button>
          </TabsContent>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications" className="space-y-4 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive email updates about your projects
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Get push notifications for important alerts
                  </div>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-sm text-muted-foreground">
                    Receive weekly summary of all projects
                  </div>
                </div>
                <Switch
                  checked={weeklyReports}
                  onCheckedChange={setWeeklyReports}
                />
              </div>
            </div>
          </TabsContent>

          {/* SECURITY TAB */}
          <TabsContent value="security" className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" className="bg-input-background" />
            </div>

            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" className="bg-input-background" />
            </div>

            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" className="bg-input-background" />
            </div>

            <Button className="w-full">Update Password</Button>
          </TabsContent>

          {/* APPEARANCE TAB */}
          <TabsContent value="appearance" className="space-y-4 py-4">
            <div className="p-4 rounded-lg border border-border">
              <div className="font-medium mb-2">Theme</div>
              <div className="text-sm text-muted-foreground mb-4">
                Currently using Dark theme
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
                  <div className="w-full h-20 rounded bg-gradient-to-br from-gray-900 to-gray-800 mb-2"></div>
                  <div className="text-sm font-medium text-center">
                    Dark
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border hover:border-primary cursor-pointer">
                  <div className="w-full h-20 rounded bg-gradient-to-br from-gray-50 to-white mb-2"></div>
                  <div className="text-sm font-medium text-center">
                    Light
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
