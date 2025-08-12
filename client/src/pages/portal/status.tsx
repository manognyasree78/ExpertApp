import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, ThumbsUp, Calendar, Filter } from "lucide-react";

interface KnowledgeItem {
  id: string;
  title: string;
  type: "Article" | "Q&A Pair" | "Case Study";
  domain: string;
  status: "Approved" | "Under Review" | "Needs Revision" | "Rejected";
  views?: number;
  helpfulRating?: number;
  submittedDate: string;
}

const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: "1",
    title: "Digital Marketing ROI",
    type: "Article",
    domain: "Marketing",
    status: "Approved",
    views: 143,
    helpfulRating: 92,
    submittedDate: "2024-01-08"
  },
  {
    id: "2",
    title: "Investment Portfolio Diversification",
    type: "Q&A Pair",
    domain: "Finance",
    status: "Under Review",
    submittedDate: "2024-01-10"
  },
  {
    id: "3",
    title: "GDPR Compliance Checklist",
    type: "Article",
    domain: "Legal",
    status: "Needs Revision",
    submittedDate: "2024-01-05"
  },
  {
    id: "4",
    title: "Social Media Strategy Q&A Set",
    type: "Q&A Pair",
    domain: "Marketing",
    status: "Approved",
    views: 89,
    helpfulRating: 95,
    submittedDate: "2024-01-03"
  },
  {
    id: "5",
    title: "Startup Funding Basics",
    type: "Article",
    domain: "Business",
    status: "Rejected",
    submittedDate: "2024-01-01"
  }
];

export default function Status() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Last Updated");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800";
      case "Needs Revision":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredItems = mockKnowledgeItems.filter(item => 
    statusFilter === "All" || item.status === statusFilter
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "Last Updated") {
      return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div data-testid="status-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="status-title">
          My Knowledge Status
        </h1>
        <p className="text-gray-600">
          Track the status and performance of your knowledge contributions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Knowledge Articles</CardTitle>
            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="filter-status">
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
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40" data-testid="sort-by">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Last Updated">Last Updated</SelectItem>
                  <SelectItem value="Title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="divide-y divide-gray-200" data-testid="knowledge-list">
            {sortedItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No knowledge items found</p>
                <p className="text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              sortedItems.map((item) => (
                <div 
                  key={item.id} 
                  className="py-6 hover:bg-gray-50 transition-smooth"
                  data-testid={`knowledge-item-${item.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2" data-testid={`title-${item.id}`}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.type} • {item.domain}
                      </p>
                      
                      {item.status === "Approved" && item.views && item.helpfulRating && (
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span data-testid={`views-${item.id}`}>{item.views} views</span>
                          </div>
                          <div className="flex items-center">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            <span data-testid={`helpful-${item.id}`}>{item.helpfulRating}% helpful</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center text-sm text-gray-500 mt-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Submitted {formatDate(item.submittedDate)}</span>
                      </div>
                    </div>
                    
                    <Badge 
                      className={`${getStatusColor(item.status)} font-medium`}
                      data-testid={`status-${item.id}`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  
                  {item.status === "Needs Revision" && (
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Reviewer feedback:</strong> Please add more specific examples and cite recent sources to strengthen your arguments.
                      </p>
                    </div>
                  )}
                  
                  {item.status === "Rejected" && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        <strong>Reason for rejection:</strong> Content does not meet our accuracy standards. Please review our guidelines and resubmit with verified information.
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          {sortedItems.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Showing {sortedItems.length} of {mockKnowledgeItems.length} items</span>
                <div className="flex space-x-4">
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Approved: {mockKnowledgeItems.filter(i => i.status === "Approved").length}
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    Under Review: {mockKnowledgeItems.filter(i => i.status === "Under Review").length}
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Needs Revision: {mockKnowledgeItems.filter(i => i.status === "Needs Revision").length}
                  </span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Rejected: {mockKnowledgeItems.filter(i => i.status === "Rejected").length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
