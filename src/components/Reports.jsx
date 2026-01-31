import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Download,
  FileText,
  Calendar,
  MapPin,
  Filter,
  ChevronRight,
  AlertCircle,
  Ruler,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Reports() {
  const [reports, setReports] = useState({});

useEffect(() => {
  const loadReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/api/v1/reports/hierarchy", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReports(res.data || {});
    } catch (err) {
      console.error("Reports load failed", err);
    }
  };

  loadReports();
}, []);

  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedDeliverable, setSelectedDeliverable] = useState("");
  const [selectedSite, setSelectedSite] = useState("");

  const industries = Object.keys(reports);

  const selectedIndustryData = reports[selectedIndustry] || null;
  const selectedProjectData =
    selectedIndustryData?.projects?.[selectedProject] || null;
  const selectedDeliverableData =
    selectedProjectData?.deliverables?.[selectedDeliverable] || null;

  const projects = selectedIndustryData
    ? Object.keys(selectedIndustryData.projects)
    : [];

  const deliverables = selectedProjectData
    ? Object.keys(selectedProjectData.deliverables)
    : [];

  const sites = selectedDeliverableData
    ? Object.keys(selectedDeliverableData.sites)
    : [];

  const siteData = selectedDeliverableData?.sites?.[selectedSite] || null;
  const mediaItems = siteData?.media || [];

  const handleIndustryChange = (value) => {
    setSelectedIndustry(value);
    setSelectedProject("");
    setSelectedDeliverable("");
    setSelectedSite("");
  };

  const handleProjectChange = (value) => {
    setSelectedProject(value);
    setSelectedDeliverable("");
    setSelectedSite("");
  };

  const handleDeliverableChange = (value) => {
    setSelectedDeliverable(value);
    setSelectedSite("");
  };

  return (
    <div className="space-y-4">
      {/* Report Configuration */}
      <Card className="border-0 bg-card">
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium">Industry</label>
              <Select
                value={selectedIndustry}
                onValueChange={handleIndustryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Project</label>
              <Select
                value={selectedProject}
                onValueChange={handleProjectChange}
                disabled={!selectedIndustry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Deliverable</label>
              <Select
                value={selectedDeliverable}
                onValueChange={handleDeliverableChange}
                disabled={!selectedProject}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Deliverable" />
                </SelectTrigger>
                <SelectContent>
                  {deliverables.map((deliverable) => (
                    <SelectItem key={deliverable} value={deliverable}>
                      {deliverable}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Empty State */}
      {!selectedDeliverable && (
        <Card className="border-0 bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl mb-2">No Report Selected</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Please select an Industry, Project, and Deliverable from the
              dropdowns above to view available sites and their reports.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Sites Selection */}
      {selectedDeliverable && !selectedSite && (
        <Card className="border-0 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>Available Sites</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sites.map((site) => {
                const siteInfo = selectedDeliverableData.sites[site].siteInfo;

                return (
                  <Card
                    key={site}
                    onClick={() => setSelectedSite(site)}
                    className="border-0 bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all group overflow-hidden"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <ImageWithFallback
                        src={siteInfo.image}
                        alt={site}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-medium flex items-center justify-between">
                        <span>{site}</span>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Inspected: {siteInfo.inspectedDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{siteInfo.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Ruler className="w-4 h-4" />
                          <span>{siteInfo.area || siteInfo.perimeter}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertCircle
                            className={`w-4 h-4 ${
                              siteInfo.defectsCount > 0
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          />
                          <span
                            className={
                              siteInfo.defectsCount > 0
                                ? "text-red-500"
                                : "text-green-500"
                            }
                          >
                            {siteInfo.defectsCount} Defects
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Media Gallery with Report Details */}
      {selectedSite && mediaItems.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>{selectedSite}</span>
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedSite("")}
              >
                Back to Sites
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {mediaItems.map((media, index) => (
              <Card key={index} className="border-0 bg-card">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Media Preview */}
                    <div className="lg:col-span-3">
                      <div className="aspect-video rounded-lg overflow-hidden border border-border">
                        <ImageWithFallback
                          src={media.url}
                          alt={media.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Report Details */}
                    <div className="lg:col-span-1 space-y-4">
                      <div>
                        <h3 className="text-lg mb-2">{media.title}</h3>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{media.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{media.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium">Metrics</label>
                        <div className="space-y-2">
                          {Object.entries(media.metrics).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="p-2 bg-muted/50 rounded-lg"
                              >
                                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </div>
                                <div className="text-sm font-semibold">
                                  {value}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
