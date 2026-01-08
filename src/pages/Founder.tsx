import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Award, Heart, Users, BookOpen, ArrowRight, Quote } from "lucide-react";
import founderImage from "@/assets/founder-portrait.jpg";

const credentials = [
  {
    icon: Award,
    title: "Certified Childcare Provider",
    description: "Fully qualified with all required childcare certifications and training."
  },
  {
    icon: Users,
    title: "Community Leader",
    description: "A trusted figure in the Castlecomer community for many years."
  },
  {
    icon: BookOpen,
    title: "Educational Specialist",
    description: "Background in education with a focus on child development."
  },
];

const Founder = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Meet the Founder
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The heart and soul behind Firoda Afterschool
            </p>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-fade-in-left">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-elevated">
                  <img
                    src={founderImage}
                    alt="Marie Kennedy - Founder of Firoda Afterschool"
                    className="w-full aspect-[4/5] object-cover object-top"
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full gradient-secondary flex items-center justify-center">
                      <Heart className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground">Years of Experience</p>
                      <p className="text-sm text-muted-foreground">In Childcare & Education</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8 animate-fade-in-right">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                  Marie Kennedy
                </h2>
                <p className="text-xl text-primary font-medium">
                  Founder & Lead Childcare Provider
                </p>
              </div>
              
              <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary">
                <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="text-foreground text-lg italic leading-relaxed">
                  "Every child deserves a safe space where they can be themselves, 
                  learn at their own pace, and build the confidence they need to thrive. 
                  That's what we strive to create at Firoda Afterschool."
                </p>
              </div>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Marie Kennedy brings years of experience in childcare and education 
                  to Firoda Afterschool. Her passion for child development and family 
                  support has been the driving force behind creating a nurturing 
                  after-school environment in Castlecomer.
                </p>
                <p>
                  As a trusted figure in the local community, Marie understands the 
                  needs of working families and the importance of quality childcare. 
                  She is committed to providing a safe, structured, and enriching 
                  experience for every child in her care.
                </p>
                <p>
                  Under Marie's leadership, Firoda Afterschool has become a valued 
                  resource for families in the area, known for its warm, welcoming 
                  atmosphere and dedication to each child's wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Qualifications & Experience
            </h2>
            <p className="text-muted-foreground text-lg">
              Marie's background ensures the highest standards of care for your children.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {credentials.map((credential, index) => (
              <div
                key={credential.title}
                className="bg-card rounded-xl p-8 shadow-card text-center hover:shadow-elevated transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
                  <credential.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-3">
                  {credential.title}
                </h3>
                <p className="text-muted-foreground">
                  {credential.description}
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
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Marie and the team would love to hear from you. Reach out to discuss 
              your child's needs or to learn more about our program.
            </p>
            <Button asChild size="lg" variant="hero">
              <Link to="/contact">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Founder;
