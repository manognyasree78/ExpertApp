import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload, Save } from "lucide-react";

interface QAPair {
  id: number;
  domain: string;
  subdomain: string;
  question: string;
  answer: string;
}

const domainOptions = {
  "Marketing": ["SEO", "General"],
  "Finance": ["General", "Investment", "Planning"],
  "Legal": ["Compliance", "Corporate", "IP"],
  "Technology": ["Cloud", "AI/ML", "DevOps"],
  "Business": ["Strategy", "Operations", "HR"]
};

export default function Contribute() {
  const { toast } = useToast();
  const [qaPairs, setQaPairs] = useState<QAPair[]>([
    { id: 1, domain: "", subdomain: "", question: "", answer: "" }
  ]);
  const [articleData, setArticleData] = useState({
    title: "",
    domain: "",
    body: ""
  });

  const addQAPair = () => {
    const newId = Math.max(...qaPairs.map(qa => qa.id)) + 1;
    setQaPairs([...qaPairs, { id: newId, domain: "", subdomain: "", question: "", answer: "" }]);
  };

  const updateQAPair = (id: number, field: keyof QAPair, value: string) => {
    setQaPairs(qaPairs.map(qa => 
      qa.id === id ? { ...qa, [field]: value } : qa
    ));
  };

  const submitQAPairs = () => {
    toast({
      title: "Success",
      description: "Q&A pairs saved and submitted for review",
    });
  };

  const submitArticle = () => {
    toast({
      title: "Success", 
      description: "Article saved and submitted for review",
    });
  };

  const handleFileUpload = () => {
    toast({
      title: "Upload Complete",
      description: "Bulk Q&A data uploaded successfully (demo)",
    });
  };

  return (
    <div className="space-y-6 text-white" data-testid="contribute-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Contribute Knowledge</h1>
        <p className="text-text-muted">Share your expertise to help power AI agents</p>
      </div>

      <Tabs defaultValue="qa" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-card-dark border border-border-dark">
          <TabsTrigger value="qa" className="data-[state=active]:bg-primary data-[state=active]:text-white">Q&A Pairs</TabsTrigger>
          <TabsTrigger value="articles" className="data-[state=active]:bg-primary data-[state=active]:text-white">Articles</TabsTrigger>
        </TabsList>

        <TabsContent value="qa" className="space-y-6">
          {qaPairs.map((qa, index) => (
            <Card key={qa.id} className="bg-card-dark border-border-dark">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <div className="w-2 h-8 bg-primary rounded-full mr-3"></div>
                  Q&A Pair #{qa.id}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-text-muted">Domain</Label>
                    <Select 
                      value={qa.domain} 
                      onValueChange={(value) => {
                        updateQAPair(qa.id, 'domain', value);
                        updateQAPair(qa.id, 'subdomain', '');
                      }}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select Domain" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(domainOptions).map(domain => (
                          <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-text-muted">Sub-domain</Label>
                    <Select 
                      value={qa.subdomain} 
                      onValueChange={(value) => updateQAPair(qa.id, 'subdomain', value)}
                      disabled={!qa.domain}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Select Sub-domain" />
                      </SelectTrigger>
                      <SelectContent>
                        {qa.domain && domainOptions[qa.domain as keyof typeof domainOptions]?.map(subdomain => (
                          <SelectItem key={subdomain} value={subdomain}>{subdomain}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-text-muted">Question</Label>
                  <Input
                    value={qa.question}
                    onChange={(e) => updateQAPair(qa.id, 'question', e.target.value)}
                    placeholder="Enter your expert question..."
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <Label className="text-text-muted">Answer</Label>
                  <Textarea
                    value={qa.answer}
                    onChange={(e) => updateQAPair(qa.id, 'answer', e.target.value)}
                    placeholder="Provide a comprehensive expert answer..."
                    rows={4}
                    className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 resize-none"
                  />
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={addQAPair}
              variant="outline"
              className="border-border-dark text-white hover:bg-gray-800"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Q&A
            </Button>
            <Button 
              onClick={handleFileUpload}
              variant="outline"
              className="border-border-dark text-white hover:bg-gray-800"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Bulk Q&A (CSV/JSON)
            </Button>
            <Button 
              onClick={submitQAPairs}
              className="bg-primary hover:bg-primary-hover"
            >
              <Save className="mr-2 h-4 w-4" />
              Save & Submit for Review
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          <Card className="bg-card-dark border-border-dark">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <div className="w-2 h-8 bg-primary rounded-full mr-3"></div>
                New Article
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-text-muted">Title</Label>
                <Input
                  value={articleData.title}
                  onChange={(e) => setArticleData({...articleData, title: e.target.value})}
                  placeholder="Enter article title..."
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <div>
                <Label className="text-text-muted">Domain</Label>
                <Select 
                  value={articleData.domain} 
                  onValueChange={(value) => setArticleData({...articleData, domain: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Select Domain" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(domainOptions).map(domain => (
                      <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-text-muted">Body</Label>
                <Textarea
                  value={articleData.body}
                  onChange={(e) => setArticleData({...articleData, body: e.target.value})}
                  placeholder="Write your comprehensive article..."
                  rows={8}
                  className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 resize-none"
                />
              </div>
              <Button 
                onClick={submitArticle}
                className="bg-primary hover:bg-primary-hover"
              >
                <Save className="mr-2 h-4 w-4" />
                Save & Submit for Review
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}