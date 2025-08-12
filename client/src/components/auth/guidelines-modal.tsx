import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

interface GuidelinesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GuidelinesModal({ open, onOpenChange }: GuidelinesModalProps) {
  const { setGuidelinesRead } = useAuth();
  const { toast } = useToast();

  const handleAcknowledge = () => {
    setGuidelinesRead(true);
    onOpenChange(false);
    toast({
      title: "Guidelines acknowledged",
      description: "You can now proceed with your application.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] bg-bg-dark border-border-dark text-white" data-testid="guidelines-modal">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Expert Program Guidelines</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Welcome to expertApp Expert Network</h3>
              <p className="text-gray-700 mb-4">
                As an expert on the expertApp platform, you'll be part of an innovative AI-powered consulting ecosystem. 
                These guidelines ensure quality service delivery and optimal user experience.
              </p>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Knowledge Contribution: Powering expertApp AI Agents</h4>
              <p className="text-gray-700 mb-4">
                Your invaluable expertise is the foundation of our AI agents. To ensure our AI can effectively learn and 
                deliver high-quality insights to users, we require your knowledge to be provided in a structured and comprehensive manner.
              </p>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">1. Purpose of Knowledge Contribution:</h5>
                  <p className="text-gray-700 mb-4">
                    The knowledge you provide will be used to train our domain-specific AI agents, enabling them to answer 
                    a wide range of user queries confidently.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">2. Recommended Knowledge Formats & Structure:</h5>
                  <p className="text-gray-700 mb-3">
                    To optimize AI learning and retrieval, please structure your knowledge as follows. We encourage clear, 
                    concise, and factual content.
                  </p>

                  <div className="ml-4 space-y-3">
                    <div>
                      <h6 className="font-medium text-gray-900 mb-2">A. Structured Q&A Pairs (Primary Method):</h6>
                      <p className="text-gray-700 mb-2">
                        Provide common questions within your domain and their definitive, expert answers. Think of questions 
                        users would typically ask and provide thorough, yet succinct, responses.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <p className="font-medium mb-1">Example:</p>
                        <p className="text-sm mb-1"><strong>Q:</strong> "What are the key differences between Series A and Series B funding?"</p>
                        <p className="text-sm">
                          <strong>A:</strong> "Series A focuses on product development and market validation with seed funding, 
                          while Series B is for scaling a proven business model, often with higher valuations and larger investments."
                        </p>
                      </div>
                    </div>

                    <div>
                      <h6 className="font-medium text-gray-900 mb-2">B. Topic-Specific Articles/Whitepapers:</h6>
                      <p className="text-gray-700 mb-2">
                        Submit concise articles or mini-whitepapers on core topics within your sub-domains. These should cover 
                        fundamental concepts, best practices, and common challenges.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Each article should be well-organized with headings, subheadings, and bullet points for readability.
                      </p>
                    </div>

                    <div>
                      <h6 className="font-medium text-gray-900 mb-2">C. Case Studies (with Solutions):</h6>
                      <p className="text-gray-700 mb-2">
                        Present real or hypothetical case studies relevant to your expertise, outlining the problem, your expert 
                        analysis, and the recommended solution/strategy.
                      </p>
                      <p className="text-gray-700 mb-4">
                        Ensure all proprietary or sensitive client information is anonymized or removed.
                      </p>
                    </div>

                    <div>
                      <h6 className="font-medium text-gray-900 mb-2">D. Glossaries/Definitions:</h6>
                      <p className="text-gray-700 mb-4">
                        Provide key industry terms and their precise definitions. This helps the AI understand domain-specific language.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">3. Content Quality & Guidelines:</h5>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                    <li><strong>Accuracy:</strong> All information must be factually correct and up-to-date within your domain.</li>
                    <li><strong>Clarity & Conciseness:</strong> Write clearly and avoid jargon where simpler terms suffice. Aim for direct answers.</li>
                    <li><strong>Objectivity:</strong> Provide unbiased, professional insights. Avoid personal opinions or promotional content.</li>
                    <li><strong>Depth:</strong> While concise, ensure answers are comprehensive enough to be truly helpful.</li>
                    <li><strong>Originality:</strong> All submitted knowledge must be your original work or properly cited where external sources are referenced.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">4. How to Submit Your Knowledge:</h5>
                  <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                    <li>Upon successful completion of your vetting, you will be granted access to our Expert Knowledge Portal.</li>
                    <li>This portal will provide structured templates for Q&A pairs, article submissions, and case studies.</li>
                    <li>Accepted File Formats: .docx, .txt, and structured .csv or .json for Q&A pairs.</li>
                    <li>Review Process: Your submitted knowledge will undergo a review process by our content team.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Expert Responsibilities</h4>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Provide accurate, professional, and ethical guidance within your domain of expertise</li>
                <li>Respond to escalated queries promptly through WhatsApp integration</li>
                <li>Maintain confidentiality of all user interactions and sensitive information</li>
                <li>Stay updated with industry trends and best practices in your field</li>
                <li>Communicate clearly and professionally in all interactions</li>
              </ul>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Quality Standards</h4>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>All responses must be factual, well-researched, and actionable</li>
                <li>Avoid speculation or advice outside your area of expertise</li>
                <li>Provide sources and references when applicable</li>
                <li>Tailor responses to the user's specific context and needs</li>
                <li>Maintain a professional tone while being approachable</li>
              </ul>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Platform Integration</h4>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>AI handles initial screening - you'll receive only relevant escalations</li>
                <li>Respond through WhatsApp when human expertise is required</li>
                <li>Your responses will be integrated back into the AI system for learning</li>
                <li>Use the expert dashboard to track your performance and earnings</li>
                <li>Report any technical issues or concerns promptly</li>
              </ul>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Compensation Models</h4>
              <p className="text-gray-700 mb-2">
                <strong>Sell Knowledge Model:</strong> Fixed payout for knowledge base contribution. Your expertise trains an AI agent you own.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Revenue Sharing Model:</strong> Usage-based compensation for real-time interventions and ongoing support.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <em>(Note: The choice is discussed during vetting—do not ask for it in the onboarding form.)</em>
              </p>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Code of Conduct</h4>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Respect user privacy and maintain strict confidentiality</li>
                <li>Avoid conflicts of interest and disclose any potential biases</li>
                <li>Do not solicit users for external business or personal gain</li>
                <li>Report inappropriate user behavior or requests</li>
                <li>Adhere to all applicable laws and professional standards</li>
              </ul>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Performance Metrics</h4>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Response time: Aim for replies within 4–6 hours during your available hours</li>
                <li>User satisfaction: Maintain high ratings through quality responses</li>
                <li>Accuracy: Provide correct and actionable advice consistently</li>
                <li>Engagement: Actively participate in platform improvement initiatives</li>
              </ul>
            </section>

            <section>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Getting Started</h4>
              <p className="text-gray-700">
                Once approved, you'll receive onboarding materials, access to your expert dashboard, and WhatsApp integration setup. 
                Our team will guide you through the initial knowledge contribution process and help optimize your expert profile.
              </p>
            </section>
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-close-guidelines">
            <X className="mr-2 h-4 w-4" />
            Close
          </Button>
          <Button onClick={handleAcknowledge} data-testid="button-acknowledge-guidelines">
            <Check className="mr-2 h-4 w-4" />
            I Have Read and Understood
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
