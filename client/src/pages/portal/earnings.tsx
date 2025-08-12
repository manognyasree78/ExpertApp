import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Star } from "lucide-react";

const kpis = [
  {
    title: "Total Earnings",
    value: "$14,630",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-400"
  },
  {
    title: "This Month",
    value: "$3,250",
    change: "+8.2%",
    icon: TrendingUp,
    color: "text-primary"
  },
  {
    title: "Avg per Contribution", 
    value: "$47.50",
    change: "+5.2% quality bonus",
    icon: Star,
    color: "text-yellow-400"
  },
  {
    title: "Agent Interactions",
    value: "2,840",
    change: "95.2% satisfaction",
    icon: Users,
    color: "text-accent"
  }
];

const revenueData = [
  { source: "Q&A Pairs", amount: "$6,350", percentage: "45.2%", color: "bg-primary" },
  { source: "Articles", amount: "$4,800", percentage: "34.1%", color: "bg-accent" },
  { source: "Agent Usage", amount: "$2,130", percentage: "15.2%", color: "bg-yellow-400" },
  { source: "Escalations", amount: "$1,350", percentage: "5.5%", color: "bg-green-400" }
];

const recentEarnings = [
  { amount: "$850", type: "Q&A Contributions", date: "2024-06-01", status: "Paid" },
  { amount: "$600", type: "Article Bonus", date: "2024-06-01", status: "Paid" },
  { amount: "$425", type: "Usage Revenue", date: "2024-05-15", status: "Paid" },
  { amount: "$750", type: "Q&A Contributions", date: "2024-05-01", status: "Paid" },
  { amount: "$300", type: "Escalation Fees", date: "2024-05-01", status: "Paid" }
];

// Simple SVG line chart component
const EarningsChart = () => {
  const points = "10,80 50,60 90,45 130,35 170,25 210,20";
  
  return (
    <div className="w-full h-64 bg-gray-800 rounded-lg p-4">
      <h3 className="text-white font-medium mb-4">Earnings Trend (Jan - Jun)</h3>
      <svg viewBox="0 0 220 100" className="w-full h-40">
        <defs>
          <linearGradient id="earningsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          points={points}
        />
        <polygon
          fill="url(#earningsGradient)"
          points={`10,90 ${points} 210,90`}
        />
        {points.split(' ').map((point, index) => {
          const [x, y] = point.split(',').map(Number);
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="#3B82F6"
            />
          );
        })}
        <text x="10" y="98" fill="#9CA3AF" fontSize="10">Jan</text>
        <text x="210" y="98" fill="#9CA3AF" fontSize="10">Jun</text>
      </svg>
    </div>
  );
};

export default function Earnings() {
  return (
    <div className="space-y-6 text-white" data-testid="earnings-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Earnings & Analytics</h1>
        <p className="text-text-muted">Track your revenue and performance metrics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="bg-card-dark border-border-dark">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-muted">{kpi.title}</p>
                    <p className="text-2xl font-bold text-white">{kpi.value}</p>
                    <p className="text-sm text-green-400">{kpi.change}</p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card-dark border border-border-dark">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">Overview</TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-gray-700">Performance</TabsTrigger>
          <TabsTrigger value="payments" className="data-[state=active]:bg-gray-700">Payments</TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-white">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          {/* Earnings Trend Chart */}
          <Card className="bg-card-dark border-border-dark">
            <CardContent className="p-6">
              <EarningsChart />
            </CardContent>
          </Card>

          {/* Revenue Sources and Recent Earnings */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Revenue Sources */}
            <Card className="bg-card-dark border-border-dark">
              <CardHeader>
                <CardTitle className="text-white">Revenue Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {revenueData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-white">{item.source}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{item.amount}</div>
                      <div className="text-text-muted text-sm">{item.percentage}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Earnings */}
            <Card className="bg-card-dark border-border-dark">
              <CardHeader>
                <CardTitle className="text-white">Recent Earnings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentEarnings.map((earning, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{earning.amount}</div>
                      <div className="text-text-muted text-sm">{earning.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-text-muted text-sm">{earning.date}</div>
                      <Badge className="bg-green-900/20 text-green-400 border-green-700 border">
                        {earning.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-card-dark border-border-dark">
            <CardContent className="p-8 text-center">
              <p className="text-text-muted">Overview content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-card-dark border-border-dark">
            <CardContent className="p-8 text-center">
              <p className="text-text-muted">Performance content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <Card className="bg-card-dark border-border-dark">
            <CardContent className="p-8 text-center">
              <p className="text-text-muted">Payments content would go here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}