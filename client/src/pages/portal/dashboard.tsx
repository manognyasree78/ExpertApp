import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  BookOpen, 
  DollarSign, 
  Users, 
  Bot, 
  Plus, 
  FileText,
  CheckCircle,
  Banknote,
  AlertCircle,
  Database
} from "lucide-react";

const kpiCards = [
  {
    title: "Knowledge Contributed",
    value: "56 Q&A Pairs",
    subtitle: "3 Articles",
    icon: BookOpen,
    color: "text-primary"
  },
  {
    title: "Total Earnings",
    value: "$2,450",
    subtitle: "This month: $320",
    icon: DollarSign,
    color: "text-green-400"
  },
  {
    title: "User Interactions",
    value: "1,234",
    subtitle: "95% satisfaction",
    icon: Users,
    color: "text-accent"
  },
  {
    title: "Active Agents",
    value: "2",
    subtitle: "Marketing & Finance",
    icon: Bot,
    color: "text-yellow-400"
  }
];

const recentActivity = [
  {
    icon: CheckCircle,
    text: "Q&A Pair #57 submitted for review",
    time: "2 hours ago",
    color: "text-blue-400"
  },
  {
    icon: FileText,
    text: "Article 'Digital Marketing ROI' approved",
    time: "4 hours ago",
    color: "text-green-400"
  },
  {
    icon: Banknote,
    text: "Revenue sharing payment of $85 processed",
    time: "1 day ago",
    color: "text-green-400"
  },
  {
    icon: AlertCircle,
    text: "New escalation received in Marketing domain",
    time: "2 days ago",
    color: "text-yellow-400"
  },
  {
    icon: Database,
    text: "Knowledge base updated with 5 new entries",
    time: "3 days ago",
    color: "text-primary"
  }
];

export default function Dashboard() {
  const { auth } = useAuth();
  const [, setLocation] = useLocation();

  // Get user name from localStorage or auth
  const getUserName = () => {
    const storedAuth = localStorage.getItem('localStorage.auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      return authData.user?.name || "Dr. Sarah Johnson";
    }
    return auth.user?.name || "Dr. Sarah Johnson";
  };

  const userName = getUserName();

  const handleContributeKnowledge = () => {
    setLocation('/portal/contribute');
  };

  const handleReviewFeedback = () => {
    setLocation('/portal/status');
  };

  return (
    <div className="space-y-6 text-white" data-testid="dashboard-page">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome, {userName}!</h1>
        <p className="text-text-muted text-lg">Here's an overview of your expert activity and contributions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="bg-card-dark border-border-dark hover:border-gray-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-text-muted mb-1">{kpi.title}</p>
                    <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
                    <p className="text-sm text-text-muted">{kpi.subtitle}</p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${kpi.color} flex-shrink-0 ml-4`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-card-dark border-border-dark mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <div className="w-2 h-8 bg-primary rounded-full mr-3"></div>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleContributeKnowledge}
              className="bg-primary hover:bg-primary-hover"
              data-testid="quick-action-contribute"
            >
              <Plus className="mr-2 h-4 w-4" />
              Contribute New Knowledge
            </Button>
            <Button 
              onClick={handleReviewFeedback}
              variant="outline"
              className="border-border-dark text-[#23252f] hover:bg-gray-800"
              data-testid="quick-action-review"
            >
              <FileText className="mr-2 h-4 w-4" />
              Review My Feedback
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-card-dark border-border-dark">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <div className="w-2 h-8 bg-accent rounded-full mr-3"></div>
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <IconComponent className={`h-5 w-5 ${activity.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{activity.text}</p>
                    <p className="text-text-muted text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}