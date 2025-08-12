import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Wallet, 
  Clock, 
  TrendingUp, 
  BookOpen, 
  MessageSquare, 
  Star, 
  DollarSign 
} from "lucide-react";

interface EarningMetric {
  title: string;
  amount: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<any>;
  color: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  description: string;
}

interface RevenueSource {
  category: string;
  amount: number;
  color: string;
}

const earningMetrics: EarningMetric[] = [
  {
    title: "Total Earnings",
    amount: "$14,630",
    change: "+12.5%",
    changeType: "positive",
    icon: Wallet,
    color: "text-green-600"
  },
  {
    title: "This Month",
    amount: "$3,250",
    change: "+8.2%",
    changeType: "positive",
    icon: Calendar,
    color: "text-primary"
  },
  {
    title: "Avg per Contribution",
    amount: "$47.50",
    change: "+5.2% bonus",
    changeType: "positive",
    icon: TrendingUp,
    color: "text-accent"
  },
  {
    title: "Agent Interactions",
    amount: "2,840",
    change: "95.2% satisfaction",
    changeType: "neutral",
    icon: MessageSquare,
    color: "text-yellow-500"
  }
];

const revenueBreakdown: RevenueSource[] = [
  { category: "Q&A Pairs", amount: 6350, color: "bg-primary" },
  { category: "Articles", amount: 4800, color: "bg-accent" },
  { category: "Agent Usage", amount: 2130, color: "bg-green-500" },
  { category: "Escalations", amount: 1350, color: "bg-yellow-500" }
];

const recentTransactions: Transaction[] = [
  {
    id: "1",
    type: "Q&A Pairs",
    amount: 850,
    date: "2024-01-12",
    description: "Monthly Q&A pair revenue share"
  },
  {
    id: "2",
    type: "Article Bonus",
    amount: 600,
    date: "2024-01-11",
    description: "High-performing article bonus"
  },
  {
    id: "3",
    type: "Agent Usage",
    amount: 425,
    date: "2024-01-10",
    description: "AI agent interaction revenue"
  },
  {
    id: "4",
    type: "Q&A Pairs",
    amount: 750,
    date: "2024-01-09",
    description: "Monthly Q&A pair revenue share"
  },
  {
    id: "5",
    type: "Escalation Fees",
    amount: 300,
    date: "2024-01-08",
    description: "WhatsApp consultation fees"
  }
];

export default function Earnings() {
  const totalRevenue = revenueBreakdown.reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div data-testid="earnings-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="earnings-title">
          Earnings
        </h1>
        <p className="text-gray-600">
          Track your revenue from knowledge contributions and consultations.
        </p>
      </div>

      {/* Earnings Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {earningMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid={`metric-${metric.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      {metric.amount}
                    </p>
                    <p className={`text-sm ${
                      metric.changeType === 'positive' ? 'text-green-600' : 
                      metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {metric.change}
                    </p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4" data-testid="revenue-breakdown">
              {revenueBreakdown.map((source, index) => {
                const IconComponent = index === 0 ? BookOpen : 
                                   index === 1 ? MessageSquare :
                                   index === 2 ? Star : DollarSign;
                return (
                  <div key={source.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <IconComponent className={`mr-3 h-5 w-5 ${
                        index === 0 ? 'text-primary' : 
                        index === 1 ? 'text-accent' :
                        index === 2 ? 'text-green-500' : 'text-yellow-500'
                      }`} />
                      <span className="font-medium">{source.category}</span>
                    </div>
                    <span className="font-semibold" data-testid={`revenue-${source.category.toLowerCase().replace(/\s+/g, '-')}`}>
                      {formatCurrency(source.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Revenue</span>
                <span className="text-xl font-bold text-primary" data-testid="total-revenue">
                  {formatCurrency(totalRevenue)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Trend Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Earnings trend chart</p>
                <p className="text-sm text-gray-400">Shows monthly earnings over time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3" data-testid="recent-transactions">
            {recentTransactions.map((transaction) => (
              <div 
                key={transaction.id} 
                className="flex justify-between items-center p-4 border-l-4 border-green-500 bg-green-50 rounded"
                data-testid={`transaction-${transaction.id}`}
              >
                <div>
                  <p className="font-medium text-gray-900" data-testid={`transaction-description-${transaction.id}`}>
                    {transaction.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    {transaction.type} • {formatDate(transaction.date)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-green-600 text-lg" data-testid={`transaction-amount-${transaction.id}`}>
                    +{formatCurrency(transaction.amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-2">Next payout scheduled for</p>
            <div className="flex items-center justify-center text-lg font-semibold text-gray-900">
              <Calendar className="h-5 w-5 mr-2" />
              January 15, 2024
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-gray-600 mr-2" />
                <span className="font-medium">Payment Schedule</span>
              </div>
              <p className="text-sm text-gray-600">Monthly on the 15th</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <Wallet className="h-5 w-5 text-gray-600 mr-2" />
                <span className="font-medium">Payment Method</span>
              </div>
              <p className="text-sm text-gray-600">Bank Transfer (****1234)</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-gray-600 mr-2" />
                <span className="font-medium">Pending Amount</span>
              </div>
              <p className="text-sm text-gray-600">$423.50</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
