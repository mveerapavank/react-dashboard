import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  MapPin,
  Calendar,
  Users,
  FileText,
  Eye,
  Edit,
  Trash2,
  BarChart3,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// ✅ JSON nundi projects data
import projects from "../data/projects-page.json";

const statusColors = {
  Active: "bg-green-500",
  "In Progress": "bg-blue-500",
  Planning: "bg-yellow-500",
  Completed: "bg-gray-500",
  "On Hold": "bg-orange-500",
};

const priorityColors = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-green-500",
};

export function Projects({ onNavigateToAnalytics }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;

    const matchesIndustry =
      industryFilter === "all" || project.industryType === industryFilter;

    return matchesSearch && matchesStatus && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Planning">Planning</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={industryFilter} onValueChange={setIndustryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Industries</SelectItem>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Public Health">Public Health</SelectItem>
                <SelectItem value="Smart City Living">
                  Smart City Living
                </SelectItem>
                <SelectItem value="Energy & Utilities">
                  Energy & Utilities
                </SelectItem>
                <SelectItem value="Mining">Mining</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Projects ({filteredProjects.length})</span>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead>Project ID</TableHead>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Deliverables</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Analytics</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow
                    key={project.id}
                    className="border-border hover:bg-muted/50"
                  >
                    <TableCell className="font-mono text-sm">
                      {project.id}
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">
                          {project.name}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          Started{" "}
                          {new Date(project.startDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">{project.industryType}</Badge>
                    </TableCell>

                    <TableCell className="text-sm">
                      {project.deliverables}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {project.location}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${statusColors[project.status]}`}
                        />
                        <span className="text-sm font-medium">
                          {project.status}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">
                          {project.progress}%
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span className="text-sm">{project.team}</span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNavigateToAnalytics?.()}
                      >
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Generate Report
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
