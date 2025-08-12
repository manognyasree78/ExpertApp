import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LandingNavbar } from "@/components/layout/landing-navbar";
import { AuthModal } from "@/components/auth/auth-modal";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { 
  Brain, 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  ExpandIcon, 
  TrendingUp, 
  Bot, 
  PiggyBank, 
  Handshake, 
  BarChart3,
  Rocket,
  PlayCircle,
  Mail,
  Phone,
  Clock3,
  Bus
} from "lucide-react";

export default function Landing() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("signup");
  const { toast } = useToast();
  const { approval } = useAuth();
  const [, setLocation] = useLocation();

  // Check for auth query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth') === '1') {
      setAuthModalOpen(true);
      setAuthModalTab('signup');
    }
  }, []);

  // Redirect if already approved
  useEffect(() => {
    if (approval.approved) {
      setLocation('/portal/dashboard');
    }
  }, [approval.approved, setLocation]);

  const openAuthModal = (type: "login" | "signup") => {
    setAuthModalTab(type);
    setAuthModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white" data-testid="landing-page">
      <LandingNavbar onOpenAuth={openAuthModal} />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center">
        {/* Professional consulting background image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&h=1080" 
            alt="Professional experts in consultation" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
            Amplify Your Impact.<br />
            <span className="text-primary">Join the Expert Network</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-subtitle">
            Monetize your specialized knowledge, extend your reach, and let AI handle the routine. You step in when judgment matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => openAuthModal('signup')}
              size="lg"
              className="bg-primary hover:bg-primary-hover px-8 py-4 text-lg font-semibold transition-medium transform hover:scale-105"
              data-testid="hero-join-now"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Join Now
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('for-experts')}
              className="border-white/30 hover:border-white px-8 py-4 text-lg font-semibold transition-medium hover:bg-white/10"
              data-testid="hero-explore"
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              Explore How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Expert Hub */}
      <section className="py-20 bg-card-dark" data-testid="why-choose-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16" data-testid="why-choose-title">
            Why Choose Expert Hub?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-bg-dark border-border-dark text-center">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-accent rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Intelligent Routing</h3>
                <p className="text-text-muted">
                  AI pre-filters queries to ensure you only handle complex cases that require your expertise.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-bg-dark border-border-dark text-center">
              <CardContent className="p-8">
                <GraduationCap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-white">Expert Knowledge</h3>
                <p className="text-text-muted">
                  Share your expertise through structured knowledge contributions that power our AI agents.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-bg-dark border-border-dark text-center">
              <CardContent className="p-8">
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-white">Real-time Responses</h3>
                <p className="text-text-muted">
                  Provide immediate value through WhatsApp integration for escalated consultations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Experts Section */}
      <section id="for-experts" className="py-20 relative" data-testid="for-experts-section">
        {/* Knowledge sharing workspace background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1971&h=1080" 
            alt="Collaborative knowledge sharing workspace" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 gradient-overlay"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="for-experts-title">
              For Experts
            </h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto">
              Transform your expertise into impact and income through our innovative platform
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: ExpandIcon, title: "Expand Reach", desc: "Connect with clients globally through AI-powered matching" },
              { icon: TrendingUp, title: "Flexible Earnings", desc: "Multiple revenue streams from knowledge and consultations" },
              { icon: Bot, title: "AI-Powered Efficiency", desc: "Focus on high-value work while AI handles routine queries" },
              { icon: PiggyBank, title: "Passive Income", desc: "Earn from your knowledge base contributions continuously" },
              { icon: Handshake, title: "Hassle-Free Escalations", desc: "Seamless handoff from AI to human expertise" },
              { icon: BarChart3, title: "Data-Driven Insights", desc: "Track performance and optimize your expert profile" },
            ].map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="bg-card-dark/90 border-border-dark backdrop-blur-sm">
                  <CardContent className="p-6">
                    <IconComponent className={`h-8 w-8 mb-3 ${index % 2 === 0 ? 'text-primary' : 'text-accent'}`} />
                    <h3 className="font-semibold mb-2 text-white">{benefit.title}</h3>
                    <p className="text-text-muted text-sm">{benefit.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { step: "1", title: "Create Profile", desc: "Setup your expert profile and credentials", color: "bg-primary" },
              { step: "2", title: "Contribute Knowledge", desc: "Share structured knowledge to train AI agents", color: "bg-accent" },
              { step: "3", title: "Handle Escalations", desc: "Respond to complex queries via WhatsApp", color: "bg-primary" },
              { step: "4", title: "Track Earnings", desc: "Monitor performance and revenue streams", color: "bg-accent" },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-text-muted text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => openAuthModal('signup')}
              size="lg"
              className="bg-primary hover:bg-primary-hover px-8 py-4 text-lg font-semibold transition-medium transform hover:scale-105"
              data-testid="for-experts-join-now"
            >
              <Rocket className="mr-2 h-5 w-5" />
              Join Now
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-card-dark" data-testid="about-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white" data-testid="about-title">
                About expertApp
              </h2>
              <p className="text-lg text-text-muted mb-6 leading-relaxed">
                expertApp revolutionizes how expertise is shared and monetized by combining AI efficiency with human intelligence. 
                Our platform creates a seamless bridge between experts and those seeking specialized knowledge.
              </p>
              <p className="text-lg text-text-muted mb-8 leading-relaxed">
                We believe that true expertise shouldn't be locked away. By democratizing access to specialized knowledge 
                through AI-powered agents backed by real experts, we're creating a new paradigm for professional consulting.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-text-muted">Experts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">50+</div>
                  <div className="text-text-muted">Domains</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10k+</div>
                  <div className="text-text-muted">Consultations</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=750" 
                alt="Professional team collaboration and consulting" 
                className="rounded-xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20" data-testid="contact-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white" data-testid="contact-title">
              Contact Us
            </h2>
            <p className="text-xl text-text-muted">Have questions? We'd love to hear from you.</p>
          </div>
          <Card className="bg-card-dark border-border-dark">
            <CardContent className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Name</label>
                    <Input 
                      placeholder="Your name" 
                      required 
                      className="bg-bg-dark border-border-dark text-white"
                      data-testid="contact-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Email</label>
                    <Input 
                      type="email" 
                      placeholder="your@email.com" 
                      required 
                      className="bg-bg-dark border-border-dark text-white"
                      data-testid="contact-email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Message</label>
                  <Textarea 
                    rows={4} 
                    placeholder="Your message" 
                    required 
                    className="bg-bg-dark border-border-dark text-white"
                    data-testid="contact-message"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary-hover"
                  data-testid="contact-submit"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark border-t border-border-dark py-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-xl font-bold text-white">Ottobon expertApp</span>
            </div>
            <div className="text-text-muted">
              © 2024 Ottobon expertApp. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen} 
        defaultTab={authModalTab} 
      />
    </div>
  );
}
