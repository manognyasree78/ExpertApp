import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Plus, Upload, BookOpen, FileText, Lightbulb, Check } from "lucide-react";

interface QAFormData {
  domain: string;
  question: string;
  answer: string;
  tags: string;
}

interface ArticleFormData {
  title: string;
  domain: string;
  content: string;
  tags: string;
}

export default function Contribute() {
  const [activeTab, setActiveTab] = useState("qa");
  const [qaCount, setQaCount] = useState(1);
  const { toast } = useToast();

  const qaForm = useForm<QAFormData>({
    defaultValues: {
      domain: "",
      question: "",
      answer: "",
      tags: "",
    },
  });

  const articleForm = useForm<ArticleFormData>({
    defaultValues: {
      title: "",
      domain: "",
      content: "",
      tags: "",
    },
  });

  const domains = [
    "Marketing → SEO",
    "Marketing → Digital Marketing",
    "Marketing → Content Strategy",
    "Finance → General",
    "Finance → Investment Banking",
    "Finance → Corporate Finance",
    "Legal → Compliance",
    "Legal → Contract Law",
    "Python → General",
    "Python → Data Science",
    "Cloud → AWS",
    "Cloud → Azure",
    "Other"
  ];

  const onSubmitQA = (data: QAFormData) => {
    toast({
      title: "Q&A Pair submitted!",
      description: "Your knowledge contribution has been submitted for review.",
    });
    qaForm.reset();
  };

  const onSubmitArticle = (data: ArticleFormData) => {
    toast({
      title: "Article submitted!",
      description: "Your article has been submitted for review.",
    });
    articleForm.reset();
  };

  const handleBulkUpload = () => {
    toast({
      title: "File uploaded successfully!",
      description: "Your bulk Q&A data has been processed and queued for review.",
    });
  };

  const addQAPair = () => {
    setQaCount(prev => prev + 1);
  };

  return (
    <div data-testid="contribute-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="contribute-title">
          Contribute Knowledge
        </h1>
        <p className="text-gray-600">
          Share your expertise to power our AI agents and help users worldwide.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Create New Knowledge Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="qa" data-testid="tab-qa">Q&A Pairs</TabsTrigger>
                  <TabsTrigger value="articles" data-testid="tab-articles">Articles</TabsTrigger>
                </TabsList>

                <TabsContent value="qa" className="space-y-6 mt-6">
                  {[...Array(qaCount)].map((_, index) => (
                    <Card key={index} className="border-2 border-dashed">
                      <CardHeader>
                        <CardTitle className="text-lg">Q&A Pair #{index + 1}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Form {...qaForm}>
                          <form onSubmit={qaForm.handleSubmit(onSubmitQA)} className="space-y-4">
                            <FormField
                              control={qaForm.control}
                              name="domain"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Domain/Sub-domain</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-qa-domain">
                                        <SelectValue placeholder="Select domain" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {domains.map((domain) => (
                                        <SelectItem key={domain} value={domain}>
                                          {domain}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={qaForm.control}
                              name="question"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Question</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Enter the question that users might ask..." 
                                      {...field} 
                                      data-testid="input-question"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={qaForm.control}
                              name="answer"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Answer</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      rows={6}
                                      placeholder="Provide a comprehensive, expert answer..." 
                                      {...field} 
                                      data-testid="textarea-answer"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={qaForm.control}
                              name="tags"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Tags</FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Add relevant tags (comma separated)" 
                                      {...field} 
                                      data-testid="input-qa-tags"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={addQAPair}
                      data-testid="button-add-qa"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Another Q&A
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleBulkUpload}
                      data-testid="button-bulk-upload"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Bulk Q&A (CSV/JSON)
                    </Button>
                    <Button 
                      onClick={qaForm.handleSubmit(onSubmitQA)}
                      data-testid="button-submit-qa"
                    >
                      Save & Submit for Review
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="articles" className="space-y-6 mt-6">
                  <Form {...articleForm}>
                    <form onSubmit={articleForm.handleSubmit(onSubmitArticle)} className="space-y-4">
                      <FormField
                        control={articleForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Article Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter article title..." 
                                {...field} 
                                data-testid="input-article-title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={articleForm.control}
                        name="domain"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Domain</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-article-domain">
                                  <SelectValue placeholder="Select domain" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {domains.map((domain) => (
                                  <SelectItem key={domain} value={domain}>
                                    {domain}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={articleForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Article Content</FormLabel>
                            <FormControl>
                              <Textarea 
                                rows={12}
                                placeholder="Write your comprehensive article content here. Include headings, bullet points, and examples for better readability..." 
                                {...field} 
                                data-testid="textarea-article-content"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={articleForm.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Add relevant tags (comma separated)" 
                                {...field} 
                                data-testid="input-article-tags"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit"
                        data-testid="button-submit-article"
                      >
                        Save & Submit for Review
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Published Articles</span>
                <span className="font-semibold" data-testid="stat-published">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Under Review</span>
                <span className="font-semibold" data-testid="stat-review">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Views</span>
                <span className="font-semibold" data-testid="stat-views">1,247</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Provide accurate, factual information
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Use clear, concise language
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Include relevant examples
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Cite sources when applicable
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Knowledge Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm">
                <Lightbulb className="h-4 w-4 text-primary mr-2" />
                <span>Q&A Pairs - Most effective for AI training</span>
              </div>
              <div className="flex items-center text-sm">
                <BookOpen className="h-4 w-4 text-accent mr-2" />
                <span>Articles - Comprehensive topic coverage</span>
              </div>
              <div className="flex items-center text-sm">
                <FileText className="h-4 w-4 text-green-600 mr-2" />
                <span>Case Studies - Real-world applications</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
