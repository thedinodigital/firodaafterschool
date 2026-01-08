import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Heart, BookOpen, Users, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import heroImage from "@/assets/hero-children.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Supervised Homework Support",
    description: "Dedicated time and space for children to complete homework with patient, caring guidance from our qualified staff.",
  },
  {
    icon: Heart,
    title: "Creative & Educational Activities",
    description: "Engaging activities including arts, crafts, games, and learning experiences that spark creativity and curiosity.",
  },
  {
    icon: Users,
    title: "Social Development",
    description: "Guided opportunities for positive peer interaction, teamwork, and building lasting friendships in a supportive setting.",
  },
  {
    icon: Clock,
    title: "Nutritious Snacks & Routines",
    description: "Healthy snacks and structured daily routines that help children feel secure and energised.",
  },
];

const benefits = [
  "Supervised homework and study support",
  "Creative and educational activities",
  "Nutritious snacks provided",
  "Safe, structured environment",
  "Qualified and caring staff",
  "NCS funding support available",
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">NCS Supported – Quality Assured</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight text-balance">
                A Safe, Supportive Afterschool Environment for{" "}
                <span className="text-primary">School-Age Children</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Firoda Afterschool provides a structured and nurturing space where children 
                can unwind after the school day, complete homework, enjoy creative activities, 
                and build positive social connections. Based at Firoda National School in 
                Castlecomer and supported by the National Childcare Scheme.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="hero">
                  <Link to="/contact">
                    Get In Touch
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in-right" style={{ animationDelay: "0.2s" }}>
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={heroImage}
                  alt="Children engaged in creative activities at Firoda Afterschool"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-card animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center">
                    <Heart className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-foreground">Quality Care</p>
                    <p className="text-sm text-muted-foreground">For School-Age Children</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              What Children Experience at Firoda Afterschool
            </h2>
            <p className="text-muted-foreground text-lg">
              A thoughtfully designed program that supports your child's wellbeing, 
              learning, and social development in a calm, caring environment.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Why Choose Firoda Afterschool?
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We understand that choosing the right afterschool care is an important 
                decision. At Firoda Afterschool, we're committed to providing a safe, 
                enriching experience for every child in our care.
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <Button asChild size="lg">
                <Link to="/about">
                  Learn More About Our Program
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                    Program Hours
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-foreground font-medium">Monday – Friday</span>
                      <span className="text-primary font-semibold">1:40 PM – 5:40 PM</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-border">
                      <span className="text-foreground font-medium">Weekends</span>
                      <span className="text-muted-foreground">Closed</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      *Hours may vary during school holidays
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-foreground">NCS Supported</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduce childcare costs with government support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero">
        <div className="container">
          <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-elevated text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Ready to Learn More?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              We'd love to hear from you. Get in touch to discuss your child's needs 
              or to arrange a visit to our afterschool program.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="hero">
                <Link to="/contact">
                  Contact Us Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/location">View Location</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
