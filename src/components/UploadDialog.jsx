import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Upload, FileText } from "lucide-react";

export function UploadDialog({ open, onOpenChange }) {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedDeliverable, setSelectedDeliverable] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const deliverableOptions = {
    infrastructure: [
      "Road Condition Assessment",
      "Bridge Inspection",
      "Pipeline Monitoring",
    ],
    "smart-city": [
      "Vehicle Management",
      "Traffic Flow Analysis",
      "Parking Optimization",
    ],
    energy: [
      "Solar Panel Efficiency",
      "Wind Turbine Health",
      "Transmission Line Monitoring",
    ],
    mining: ["Site Survey", "Equipment Health", "Environmental Impact"],
    health: [
      "Air Quality Monitoring",
      "Water Quality Testing",
      "Vector Control",
    ],
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    // TODO: Handle file drop here
    // const files = e.dataTransfer.files;
  };

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.click();
    // TODO: attach onChange if you want to read selected files
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-orange-500" />
            <span>Upload Files</span>
          </DialogTitle>
          <DialogDescription>
            Upload files for your selected industry, deliverable, and project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Industry Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Industry Type</label>
            <Select
              value={selectedIndustry}
              onValueChange={setSelectedIndustry}
            >
              <SelectTrigger className="w-full bg-input-background border-border">
                <SelectValue placeholder="Select industry..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="smart-city">Smart City Living</SelectItem>
                <SelectItem value="energy">Energy & Utilities</SelectItem>
                <SelectItem value="mining">Mining</SelectItem>
                <SelectItem value="health">Public Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deliverable */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Deliverable</label>
            <Select
              value={selectedDeliverable}
              onValueChange={setSelectedDeliverable}
              disabled={!selectedIndustry}
            >
              <SelectTrigger className="w-full bg-input-background border-border">
                <SelectValue placeholder="Select deliverable..." />
              </SelectTrigger>
              <SelectContent>
                {selectedIndustry &&
                  deliverableOptions[selectedIndustry]?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Project */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Project</label>
            <Select
              value={selectedProject}
              onValueChange={setSelectedProject}
            >
              <SelectTrigger className="w-full bg-input-background border-border">
                <SelectValue placeholder="Select project..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project-1">
                  Highway Infrastructure Survey
                </SelectItem>
                <SelectItem value="project-2">
                  Urban Traffic Analysis
                </SelectItem>
                <SelectItem value="project-3">
                  Smart City Analytics
                </SelectItem>
                <SelectItem value="project-4">
                  Solar Farm Inspection
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Select Files */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Files</label>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border bg-muted/20"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleFileSelect}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <FileText className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground cursor-pointer">
                  Click to select files or drag and drop
                </p>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <Button
            className="w-full bg-muted-foreground hover:bg-muted-foreground/90 text-white"
            size="lg"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
