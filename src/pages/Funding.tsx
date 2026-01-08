import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Shield, Wallet, CheckCircle, ExternalLink, ArrowRight, HelpCircle } from "lucide-react";

const benefits = [
  "Up to 45% reduction in childcare costs for eligible families",
  "Income-based subsidy available for qualifying households",
  "Simple online application process",
  "Funding paid directly to the childcare provider",
  "Available for children aged 6 months to 15 years",
];

const faqs = [
  {
    question: "What is the National Childcare Scheme?",
    answer: "The NCS is a national scheme of financial support for parents towards the cost of quality childcare. It provides both universal and income-assessed subsidies to help make childcare more affordable."
  },
  {
    question: "How do I apply for NCS funding?",
    answer: "You can apply online through the NCS website. Once approved, the subsidy is paid directly to Firoda Afterschool, reducing your fees accordingly."
  },
  {
    question: "Am I eligible for NCS support?",
    answer: "Most families with children in registered childcare are eligible for some level of support. The amount depends on your family income and circumstances."
  },
];

const Funding = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">NCS Supported Program</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Funding & Support
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Quality childcare made affordable through the National Childcare Scheme
            </p>
          </div>
        </div>
      </section>

      {/* NCS Overview */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                National Childcare Scheme (NCS)
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                Firoda Afterschool is registered with the National Childcare Scheme (NCS), 
                helping families access quality childcare with financial support where 
                eligible. This government-backed scheme can significantly reduce the 
                cost of afterschool care for qualifying families.
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're working, studying, or looking for work, you may be entitled 
                to NCS support. The scheme offers both universal subsidies and income-assessed 
                subsidies to make childcare more accessible for families across Ireland.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button asChild size="lg">
                <a 
                  href="https://www.ncs.gov.ie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit NCS Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
            
            <div className="animate-fade-in-right">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                <div className="grid gap-6">
                  <div className="bg-card rounded-xl p-6 shadow-card">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-foreground">
                        NCS Supported
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      We are a fully registered NCS provider, ensuring you can 
                      access government subsidies for your child's care.
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-xl p-6 shadow-card">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-secondary-foreground" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-foreground">
                        Quality Assured
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Our program meets all Tusla requirements and quality standards 
                      for registered childcare providers.
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-xl p-6 shadow-card">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-foreground">
                        Affordable Care
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      With NCS support, quality afterschool care becomes more 
                      accessible for families of all income levels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Common questions about NCS funding and how it works with our program.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-card rounded-xl p-8 shadow-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Have Questions About Funding?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              We're happy to help you understand your options and guide you through 
              the NCS application process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="hero">
                <Link to="/contact">
                  Contact Us for Details
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a 
                  href="https://www.ncs.gov.ie" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit NCS Website
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Funding;
