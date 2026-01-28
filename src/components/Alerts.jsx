import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Search,
  Filter,
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  X,
  MoreHorizontal,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

// ✅ JSON import
import alerts from "../data/alerts-page.json";

const severityConfig = {
  critical: {
    color: "bg-red-500",
    icon: AlertTriangle,
    textColor: "text-red-500",
  },
  warning: {
    color: "bg-yellow-500",
    icon: AlertTriangle,
    textColor: "text-yellow-500",
  },
  info: {
    color: "bg-blue-500",
    icon: Bell,
    textColor: "text-blue-500",
  },
};

const statusConfig = {
  active: { color: "bg-red-500", label: "Active" },
  acknowledged: { color: "bg-yellow-500", label: "Acknowledged" },
  resolved: { color: "bg-green-500", label: "Resolved" },
};

export function Alerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || alert.status === statusFilter;

    const matchesSeverity =
      severityFilter === "all" || alert.severity === severityFilter;

    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const activeAlertsCount = alerts.filter(
    (alert) => alert.status === "active"
  ).length;

  const criticalAlertsCount = alerts.filter(
    (alert) => alert.severity === "critical"
  ).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Alerts</p>
              <h3 className="text-2xl font-bold">{alerts.length}</h3>
            </div>
            <Bell />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Alerts</p>
              <h3 className="text-2xl font-bold text-red-500">
                {activeAlertsCount}
              </h3>
            </div>
            <AlertTriangle />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Critical</p>
              <h3 className="text-2xl font-bold text-orange-500">
                {criticalAlertsCount}
              </h3>
            </div>
            <AlertTriangle />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolved Today</p>
              <h3 className="text-2xl font-bold text-green-500">12</h3>
            </div>
            <CheckCircle />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6 flex gap-4 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="acknowledged">Acknowledged</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Information</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts ({filteredAlerts.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert ID</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredAlerts.map((alert) => {
                const severityInfo = severityConfig[alert.severity];
                const statusInfo = statusConfig[alert.status];
                const SeverityIcon = severityInfo.icon;

                return (
                  <TableRow key={alert.id}>
                    <TableCell>{alert.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {alert.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Clock className="inline w-3 h-3 mr-1" />
                      {alert.dateTime}
                    </TableCell>
                    <TableCell>{alert.source}</TableCell>
                    <TableCell>{alert.recipient}</TableCell>

                    <TableCell>
                      <span className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${statusInfo.color}`}
                        />
                        {statusInfo.label}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`flex items-center gap-2 ${severityInfo.textColor}`}
                      >
                        <SeverityIcon className="w-4 h-4" />
                        {alert.severity}
                      </span>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <X className="w-4 h-4 mr-2" />
                            Dismiss
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
