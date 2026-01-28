import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  FolderKanban,
  AlertTriangle,
  Activity,
  MapPin,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  CheckCircle2,
  ListTodo,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// JSON importsss
import allProjects from "../data/dashboard-projects.json";
import siteLocations from "../data/dashboard-sites.json";
import projectData from "../data/dashboard-project-meta.json";
import graphConfig from "../data/dashboard-graphs.json";

// icon string -> component map
const ICON_MAP = {
  "bar-chart-3": BarChart3,
  "pie-chart": PieChart,
  "trending-up": TrendingUp,
};

export function Dashboard({ onProjectClick }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);

  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
    setSelectedSite(null);
  };

  const handleSiteClick = (siteId) => {
    setSelectedSite(siteId);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setSelectedSite(null);
  };

  const handleBackToSites = () => {
    setSelectedSite(null);
  };

  const selectedProjectSites = selectedProject
    ? siteLocations[selectedProject] || []
    : [];
  const selectedSiteData =
    selectedProjectSites.find((site) => site.id === selectedSite) || null;

  return (
    <div className="space-y-4">
      {/* Stats Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border bg-card hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Tasks
                </p>
                <h3 className="text-2xl font-bold text-foreground">24</h3>
                <div className="flex items-center text-xs text-blue-500">
                  <ListTodo className="w-3 h-3 mr-1" />
                  In progress
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                <ListTodo className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Complete Tasks
                </p>
                <h3 className="text-2xl font-bold text-foreground">156</h3>
                <div className="flex items-center text-xs text-green-500">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  +12 this week
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Projects
                </p>
                <h3 className="text-2xl font-bold text-foreground">12</h3>
                <div className="flex items-center text-xs text-green-500">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% from last month
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                <FolderKanban className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Active Alerts
                </p>
                <h3 className="text-2xl font-bold text-foreground">3</h3>
                <div className="flex items-center text-xs text-orange-500">
                  <Target className="w-3 h-3 mr-1" />
                  2 require attention
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects / Sites / Site detail */}
      {!selectedProject ? (
        // Show all projects initially
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project) => (
            <div
              key={project.id}
              className="cursor-pointer group"
              onClick={() => handleProjectClick(project.id)}
            >
              <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                <CardContent className="p-0 relative h-64">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs bg-black/50 border-white/20 text-white"
                      >
                        {project.id}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-white text-lg line-clamp-2">
                      {project.title}
                    </h4>
                    <div className="flex items-center text-sm text-white/90">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : !selectedSite ? (
        // Show site locations when a project is clicked
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-semibold">
                {allProjects.find((p) => p.id === selectedProject)?.title} - Site
                Locations
              </span>
            </div>
            <button
              onClick={handleBackToProjects}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to All Projects
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedProjectSites.map((site) => (
              <div
                key={site.id}
                className="cursor-pointer group"
                onClick={() => handleSiteClick(site.id)}
              >
                <Card className="border-border bg-card hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                  <CardContent className="p-0 relative h-64">
                    <ImageWithFallback
                      src={site.image}
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                      <h4 className="font-semibold text-white text-lg line-clamp-2">
                        {site.name}
                      </h4>
                      <div className="flex items-center text-sm text-white/90">
                        <MapPin className="w-4 h-4 mr-1" />
                        {site.location}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-white/80">
                          <span>Progress</span>
                          <span>{site.progress}%</span>
                        </div>
                        <Progress value={site.progress} className="h-1.5" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Show site details when a site is clicked
        <Card className="border-border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-500" />
                <span>Site Details</span>
              </div>
              <button
                onClick={handleBackToSites}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Project Sites
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Site Photo and Details */}
              <div className="space-y-4">
                <div
                  className="aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={onProjectClick}
                >
                  <ImageWithFallback
                    src={selectedSiteData?.image || ""}
                    alt={selectedSiteData?.name || ""}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {selectedSiteData?.name || ""}
                    </h3>
                    <Badge
                      variant={
                        projectData.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {projectData.status}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {projectData.category}
                  </p>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedSiteData?.location || ""}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {selectedSiteData?.progress || 0}%
                      </span>
                    </div>
                    <Progress
                      value={selectedSiteData?.progress || 0}
                      className="h-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2 text-sm pt-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Distance
                      </span>
                      <span className="font-medium">
                        {projectData.details.totalKm}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Defects Found
                      </span>
                      <span className="font-medium">
                        {projectData.details.defectsFound}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Sections Reviewed
                      </span>
                      <span className="font-medium">
                        {projectData.details.sectionsReviewed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graph Cards */}
              <div className="grid grid-cols-1 gap-4">
                {graphConfig.map((graph, index) => {
                  const Icon = ICON_MAP[graph.icon] || Activity;
                  return (
                    <Card key={index} className="border-border bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${graph.color} flex items-center justify-center`}
                            >
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="font-medium text-sm text-foreground">
                              {graph.title}
                            </h4>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {Object.entries(graph.data).map(
                            ([key, value], idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs"
                              >
                                <span className="text-muted-foreground capitalize">
                                  {key}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <div className="w-16 bg-muted rounded-full h-1.5">
                                    <div
                                      className={`h-1.5 rounded-full bg-gradient-to-r ${graph.color}`}
                                      style={{ width: `${value}%` }}
                                    />
                                  </div>
                                  <span className="font-medium text-foreground w-8">
                                    {value}%
                                  </span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
