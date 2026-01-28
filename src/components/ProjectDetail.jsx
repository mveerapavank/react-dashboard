import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  Target,
  FileText,
  Download,
  Share2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projectImages = [
  {
    url: "https://images.unsplash.com/photo-1531431057391-da7a1aabd412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMHByb2plY3QlMjBhZXJpYWwlMjBkcm9uZXxlbnwxfHx8fDE3NTk3MzQxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Highway Overview",
    description: "Aerial view of the complete highway section",
  },
  {
    url: "https://images.unsplash.com/photo-1568671566370-49b36c5c7805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdod2F5JTIwYnJpZGdlJTIwaW5mcmFzdHJ1Y3R1cmUlMjBpbnNwZWN0aW9ufGVufDF8fHx8MTc1OTczNDIzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Bridge Inspection",
    description: "Detailed structural analysis of bridge connections",
  },
  {
    url: "https://images.unsplash.com/photo-1707405644816-2d48b6a3b8d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FkJTIwY29uc3RydWN0aW9uJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NTk3MzQyMzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Road Surface Analysis",
    description: "Surface condition assessment and material quality",
  },
  {
    url: "https://images.unsplash.com/photo-1671959541798-878565a4c103?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMG1vbml0b3JpbmclMjBkcm9uZSUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NTk3MzQyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Equipment Monitoring",
    description: "Drone and sensor equipment deployment status",
  },
];

const projectMetrics = [
  { label: "Total Distance", value: "245 km", icon: Target },
  { label: "Sections Completed", value: "174/189", icon: Target },
  { label: "Defects Identified", value: "23", icon: Target },
  { label: "Quality Score", value: "92%", icon: Target },
];

const teamMembers = [
  { name: "Sarah Chen", role: "Project Lead", avatar: "SC" },
  { name: "Mike Rodriguez", role: "Infrastructure Analyst", avatar: "MR" },
  { name: "Priya Sharma", role: "Drone Operator", avatar: "PS" },
  { name: "James Wilson", role: "Quality Inspector", avatar: "JW" },
];

export function ProjectDetail({ onBack }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Highway Infrastructure Survey
            </h1>
            <p className="text-muted-foreground">
              Complete infrastructure analysis and condition assessment
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Project Status and Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Project Overview</span>
                <Badge variant="default">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projectMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-4 rounded-lg bg-muted/50"
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                      <div className="text-lg font-semibold text-foreground">
                        {metric.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-lg font-bold">87%</span>
                </div>
                <Progress value={87} className="h-3" />
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-green-500">Completed</div>
                    <div className="text-muted-foreground">174 sections</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-yellow-500">In Progress</div>
                    <div className="text-muted-foreground">12 sections</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-500">Pending</div>
                    <div className="text-muted-foreground">3 sections</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Project Info */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-sm text-muted-foreground">
                    Hyderabad, Telangana
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Timeline</div>
                  <div className="text-sm text-muted-foreground">
                    Jan 15 - Dec 30, 2024
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">Team Size</div>
                  <div className="text-sm text-muted-foreground">
                    4 specialists
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-medium">
                      {member.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Project Images Gallery */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Project Documentation & Images</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectImages.map((image, index) => (
              <div key={index} className="space-y-3">
                <div className="aspect-video rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-foreground">
                    {image.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Section 7 inspection completed
                </p>
                <p className="text-xs text-muted-foreground">
                  Quality score: 94% • 2 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Drone survey of bridge section initiated
                </p>
                <p className="text-xs text-muted-foreground">
                  Equipment deployed • 4 hours ago
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Material quality test results received
                </p>
                <p className="text-xs text-muted-foreground">
                  Lab Report #HI-2024-089 • 6 hours ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
