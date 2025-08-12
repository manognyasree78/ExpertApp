import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, XCircle, BookOpen, MessageSquare } from "lucide-react";

interface KnowledgeItem {
  id: number;
  title: string;
  type: "Article" | "Q&A Pair";
  domain: string;
  status: "Approved" | "Under Review" | "Needs Revision" | "Rejected";
  lastUpdated: string;
}

const knowledgeItems: KnowledgeItem[] = [
  {
    id: 1,
    title: "Digital Marketing ROI",
    type: "Article",
    domain: "Marketing",
    status: "Approved",
    lastUpdated: "2024-06-15"
  },
  {
    id: 2,
    title: "Investment Portfolio Diversification",
    type: "Q&A Pair",
    domain: "Finance",
    status: "Under Review",
    lastUpdated: "2024-06-14"
  },
  {
    id: 3,
    title: "GDPR Compliance Checklist",
    type: "Article",
    domain: "Legal",
    status: "Needs Revision",
    lastUpdated: "2024-06-13"
  },
  {
    id: 4,
    title: "Social Media Strategy Q&A Set",
    type: "Q&A Pair",
    domain: "Marketing",
    status: "Approved",
    lastUpdated: "2024-06-12"
  },
  {
    id: 5,
    title: "Startup Funding Basics",
    type: "Article",
    domain: "Business",
    status: "Rejected",
    lastUpdated: "2024-06-11"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Approved": return <CheckCircle className="h-4 w-4 text-green-400" />;
    case "Under Review": return <Clock className="h-4 w-4 text-yellow-400" />;
    case "Needs Revision": return <AlertCircle className="h-4 w-4 text-blue-400" />;
    case "Rejected": return <XCircle className="h-4 w-4 text-red-400" />;
    default: return null;
  }
};

const getStatusBadge = (status: string) => {
  const variants = {
    "Approved": "bg-green-900/20 text-green-400 border-green-700",
    "Under Review": "bg-yellow-900/20 text-yellow-400 border-yellow-700",
    "Needs Revision": "bg-blue-900/20 text-blue-400 border-blue-700",
    "Rejected": "bg-red-900/20 text-red-400 border-red-700"
  };
  
  return (
    <Badge className={`${variants[status as keyof typeof variants]} border`}>
      {getStatusIcon(status)}
      <span className="ml-1">{status}</span>
    </Badge>
  );
};

export default function Status() {
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Last Updated");

  const filteredItems = knowledgeItems.filter(item => 
    statusFilter === "All" || item.status === statusFilter
  );

  return (
    <div className="space-y-6 text-white" data-testid="status-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">My Knowledge Status & Feedback</h1>
        <p className="text-text-muted">Track your contributions and review feedback</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-sm">Filter by Status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Needs Revision">Needs Revision</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-muted text-sm">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Last Updated">Last Updated</SelectItem>
              <SelectItem value="Title">Title</SelectItem>
              <SelectItem value="Status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Knowledge Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-card-dark border-border-dark hover:border-gray-600 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    {item.type === "Article" ? 
                      <BookOpen className="h-6 w-6 text-primary" /> : 
                      <MessageSquare className="h-6 w-6 text-accent" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-medium text-white truncate">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-text-muted">{item.type}</span>
                      <span className="text-sm text-primary">{item.domain}</span>
                      <span className="text-sm text-text-muted">Updated: {item.lastUpdated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {getStatusBadge(item.status)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="bg-card-dark border-border-dark">
          <CardContent className="p-8 text-center">
            <p className="text-text-muted">No knowledge items found matching your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}