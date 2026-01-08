import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { 
  BookOpen, 
  Heart, 
  Users, 
  Utensils, 
  Sparkles, 
  CheckCircle,
  ArrowRight 
} from "lucide-react";

const programHighlights = [
  {
    icon: BookOpen,
    title: "Supervised Homework & Study Support",
    description: "Dedicated time and space for children to complete their homework with assistance from our caring staff, helping reinforce school learning."
  },
  {
    icon: Sparkles,
    title: "Creative & Educational Activities",
    description: "Engaging activities including arts and crafts, educational games, and creative play that stimulate imagination and learning."
  },
  {
    icon: Utensils,
    title: "Nutritious Snacks & Healthy Meals",
    description: "We provide healthy, balanced snacks to keep children energised and focused throughout the afternoon."
  },
  {
    icon: Users,
    title: "Social Skills Development",
    description: "Opportunities for positive peer interaction, teamwork, and building lasting friendships in a supportive environment."
  },
];

const values = [
  "Safe and secure environment",
  "Qualified and vetted staff",
  "Age-appropriate activities",
  "Open communication with parents",
  "Flexible and accommodating approach",
  "NCS funding support available",
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              About Our Program
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              At Firoda Afterschool, we provide a safe, structured, and engaging environment 
              where children can relax, socialise, complete homework, and enjoy enriching 
              activities after the school day ends.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">Our Mission</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                Creating a Nurturing Space for Every Child
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe every child deserves a supportive environment where they can 
                thrive after the school day. Our program bridges the gap between school 
                and home, providing a structured yet relaxed setting where children can 
                unwind, learn, and grow.
              </p>
              
              <p className="text-muted-foreground text-lg leading-relaxed">
                Located within Firoda National School, our afterschool program offers 
                convenience for families while maintaining a familiar, comfortable 
                environment for children. We work closely with parents to ensure each 
                child's individual needs are met.
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-3 pt-4">
                {values.map((value) => (
                  <li key={value} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative animate-fade-in-right">
              <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8">
                <div className="bg-card rounded-xl p-8 shadow-card">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-6">
                    What Parents Say
                  </h3>
                  <blockquote className="text-muted-foreground italic leading-relaxed mb-6">
                    "Firoda Afterschool has been wonderful for our family. Knowing our 
                    children are safe, happy, and supported while we're at work gives 
                    us such peace of mind."
                  </blockquote>
                  <p className="text-foreground font-medium">— A Firoda Parent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Program Highlights
            </h2>
            <p className="text-muted-foreground text-lg">
              Our comprehensive program is designed to support your child's development 
              across multiple areas.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {programHighlights.map((highlight, index) => (
              <div
                key={highlight.title}
                className="bg-card rounded-xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
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
              Meet Our Founder
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Learn more about Marie Kennedy and her passion for providing quality 
              childcare in the Castlecomer community.
            </p>
            <Button asChild size="lg" variant="hero">
              <Link to="/founder">
                Meet Marie Kennedy
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
