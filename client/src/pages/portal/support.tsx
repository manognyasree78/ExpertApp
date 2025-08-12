import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MessageCircle, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function Support() {
  const { toast } = useToast();
  const [message, setMessage] = useState({
    subject: "",
    description: "",
    priority: "Medium"
  });

  const handleSubmit = () => {
    toast({
      title: "Support Request Sent",
      description: "We'll get back to you within 24 hours"
    });
    setMessage({ subject: "", description: "", priority: "Medium" });
  };

  return (
    <div className="space-y-6 text-white max-w-4xl" data-testid="support-page">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Support</h1>
        <p className="text-text-muted">Get help with your expert portal experience</p>
      </div>

      {/* Contact Information */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card-dark border-border-dark">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-medium text-white mb-2">Email Support</h3>
            <p className="text-text-muted text-sm mb-3">General inquiries and support</p>
            <a 
              href="mailto:support@ottobon.in"
              className="text-primary hover:text-primary-hover transition-colors"
            >
              support@ottobon.in
            </a>
          </CardContent>
        </Card>

        <Card className="bg-card-dark border-border-dark">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-medium text-white mb-2">Live Chat</h3>
            <p className="text-text-muted text-sm mb-3">Real-time assistance</p>
            <Button 
              variant="outline" 
              size="sm"
              className="border-border-dark text-white hover:bg-gray-800"
              onClick={() => toast({ title: "Chat", description: "Live chat feature coming soon" })}
            >
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card-dark border-border-dark">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="font-medium text-white mb-2">Response Time</h3>
            <p className="text-text-muted text-sm mb-1">Email: Within 24 hours</p>
            <p className="text-text-muted text-sm">Chat: Real-time</p>
          </CardContent>
        </Card>
      </div>

      {/* Support Request Form */}
      <Card className="bg-card-dark border-border-dark">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Send className="mr-2 h-5 w-5" />
            Submit a Support Request
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-text-muted">Subject</Label>
            <Input
              value={message.subject}
              onChange={(e) => setMessage({...message, subject: e.target.value})}
              placeholder="Brief description of your issue..."
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>

          <div>
            <Label className="text-text-muted">Priority</Label>
            <select 
              value={message.priority}
              onChange={(e) => setMessage({...message, priority: e.target.value})}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-md text-white"
            >
              <option value="Low">Low - General inquiry</option>
              <option value="Medium">Medium - Account issue</option>
              <option value="High">High - Technical problem</option>
              <option value="Urgent">Urgent - System down</option>
            </select>
          </div>

          <div>
            <Label className="text-text-muted">Description</Label>
            <Textarea
              value={message.description}
              onChange={(e) => setMessage({...message, description: e.target.value})}
              placeholder="Please provide detailed information about your issue..."
              rows={6}
              className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 resize-none"
            />
          </div>

          <Button 
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary-hover"
            disabled={!message.subject || !message.description}
          >
            <Send className="mr-2 h-4 w-4" />
            Send Support Request
          </Button>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="bg-card-dark border-border-dark">
        <CardHeader>
          <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              question: "How do I get paid for my contributions?",
              answer: "Payments are processed monthly based on the usage of your contributions. You can track your earnings in the Earnings section."
            },
            {
              question: "How long does it take for content to be reviewed?",
              answer: "Most Q&A pairs are reviewed within 2-3 business days, while articles may take up to 5 business days for thorough review."
            },
            {
              question: "Can I edit my submissions after they're approved?",
              answer: "Yes, you can suggest edits to approved content. All changes go through our review process to maintain quality."
            },
            {
              question: "What happens if my content is rejected?",
              answer: "You'll receive detailed feedback explaining the reasons for rejection and suggestions for improvement. You can resubmit after addressing the issues."
            }
          ].map((faq, index) => (
            <div key={index} className="border-b border-border-dark pb-4 last:border-b-0">
              <h4 className="font-medium text-white mb-2">{faq.question}</h4>
              <p className="text-text-muted text-sm">{faq.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}