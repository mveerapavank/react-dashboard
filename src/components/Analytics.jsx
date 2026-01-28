import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  RefreshCw,
  ChevronDown,
  LineChart,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

// ✅ JSON import
import analyticsData from "../data/analytics-page.json";

const { civilSuppliesData, stockDistribution, monthlyDistribution, supplyChainEfficiency } =
  analyticsData;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()} tons
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-foreground font-medium">
          {payload[0].name}: {payload[0].value}%
        </p>
      </div>
    );
  }
  return null;
};

const ViewDropdown = ({ onViewChange }) => (
  <Select defaultValue="annual" onValueChange={onViewChange}>
    <SelectTrigger className="w-36 h-8 text-xs">
      <SelectValue />
      <ChevronDown className="w-3 h-3" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="quarterly">Quarterly View</SelectItem>
      <SelectItem value="annual">Annual View</SelectItem>
    </SelectContent>
  </Select>
);

export function Analytics() {
  const [barChartView, setBarChartView] = useState("annual");
  const [pieChartView, setPieChartView] = useState("annual");
  const [areaChartView, setAreaChartView] = useState("annual");
  const [lineChartView, setLineChartView] = useState("annual");

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-full bg-background">
      {/* Global Refresh Button */}
      <div className="flex justify-end mb-6">
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-10rem)]">
        {/* Bar Chart */}
        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Andhra Pradesh Food & Civil Supplies
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Civil Supplies QTY (in Tons) by District
                  </p>
                </div>
              </CardTitle>
              <ViewDropdown onViewChange={setBarChartView} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={civilSuppliesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  barCategoryGap="15%"
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="district"
                    stroke="#9ca3af"
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={11}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="rice"
                    fill="#3b82f6"
                    name="Rice"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="wheat"
                    fill="#10b981"
                    name="Wheat"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="sugar"
                    fill="#f59e0b"
                    name="Sugar"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">Rice</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Wheat</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-muted-foreground">Sugar</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Donut Chart */}
        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    State Stock Distribution
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Current inventory breakdown (%)
                  </p>
                </div>
              </CardTitle>
              <ViewDropdown onViewChange={setPieChartView} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={stockDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={110}
                    innerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {stockDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-xs text-muted-foreground">
                    Total Stock
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
              {stockDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-foreground">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Area Chart */}
        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Quantity of Food Grains distributed
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    (in metric tons)
                  </p>
                </div>
              </CardTitle>
              <ViewDropdown onViewChange={setAreaChartView} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#3b82f6"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="#3b82f6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#10b981"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#f59e0b"
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor="#f59e0b"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={11}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="rice"
                    stackId="1"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRice)"
                    name="Rice"
                  />
                  <Area
                    type="monotone"
                    dataKey="wheat"
                    stackId="1"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorWheat)"
                    name="Wheat"
                  />
                  <Area
                    type="monotone"
                    dataKey="sugar"
                    stackId="1"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSugar)"
                    name="Sugar"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">Rice</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">Wheat</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-muted-foreground">Sugar</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="bg-card border-border shadow-sm hover:shadow-md transition-all duration-200">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <LineChart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Supply Chain Efficiency
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Quarterly performance metrics (%)
                  </p>
                </div>
              </CardTitle>
              <ViewDropdown onViewChange={setLineChartView} />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={supplyChainEfficiency}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#374151"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="quarter"
                    stroke="#9ca3af"
                    fontSize={11}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={11}
                    domain={[80, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="procurement"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                    name="Procurement"
                  />
                  <Line
                    type="monotone"
                    dataKey="distribution"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                    name="Distribution"
                  />
                  <Line
                    type="monotone"
                    dataKey="storage"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", strokeWidth: 2, r: 6 }}
                    name="Storage"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm text-muted-foreground">
                  Procurement
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-muted-foreground">
                  Distribution
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm text-muted-foreground">
                  Storage
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
