import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  MessageSquare, 
  BookOpen, 
  DollarSign, 
  Star, 
  TrendingUp,
  CheckCircle,
  Clock
} from "lucide-react";

export default function Dashboard() {
  const { auth } = useAuth();
  const [, setLocation] = useLocation();

  const metrics = [
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
      color: "text-green-600"
    },
    {
      title: "User Interactions",
      value: "1,234",
      subtitle: "95% satisfaction",
      icon: MessageSquare,
      color: "text-accent"
    },
    {
      title: "Active Agents",
      value: "2",
      subtitle: "Marketing & Finance",
      icon: Star,
      color: "text-yellow-500"
    }
  ];

  const recentActivity = [
    {
      icon: MessageSquare,
      title: "Q&A Pair #57 submitted for review",
      time: "2 hours ago",
      color: "text-primary"
    },
    {
      icon: CheckCircle,
      title: "Article 'Digital Marketing ROI' approved",
      time: "1 day ago",
      color: "text-green-600"
    },
    {
      icon: DollarSign,
      title: "Revenue sharing payment of $85 processed",
      time: "2 days ago",
      color: "text-accent"
    },
    {
      icon: MessageSquare,
      title: "New escalation received in Marketing domain",
      time: "3 days ago",
      color: "text-primary"
    },
    {
      icon: BookOpen,
      title: "Knowledge base updated with 5 new entries",
      time: "5 days ago",
      color: "text-green-600"
    }
  ];

  return (
    <div data-testid="dashboard-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="dashboard-title">
          Welcome, {auth.user.name}!
        </h1>
        <p className="text-gray-600">Here's your expert activity overview.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid={`metric-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      {metric.value}
                    </p>
                    <p className="text-sm text-gray-500">{metric.subtitle}</p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={() => setLocation('/portal/contribute')}
              className="w-full justify-start"
              variant="outline"
              data-testid="quick-action-contribute"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Contribute New Knowledge
            </Button>
            <Button 
              onClick={() => setLocation('/portal/status')}
              className="w-full justify-start"
              variant="outline"
              data-testid="quick-action-review"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Review My Feedback
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Response Time</span>
                <span className="font-medium text-gray-900">2.3 hrs avg</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Client Satisfaction</span>
                <span className="font-medium text-gray-900">4.9/5.0</span>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Knowledge Utilization</span>
                <span className="font-medium text-gray-900">73%</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4" data-testid="recent-activity">
            {recentActivity.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <IconComponent className={`mr-3 h-5 w-5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
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
