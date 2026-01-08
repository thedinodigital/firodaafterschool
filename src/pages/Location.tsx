import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { MapPin, Clock, ExternalLink, ArrowRight, Calendar } from "lucide-react";
import schoolImage from "@/assets/school-exterior.jpg";

const Location = () => {
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Firoda+National+School+Skehana+Castlecomer+R95+E22N+Ireland";
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              Location & Hours
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Find us at Firoda National School in the heart of Castlecomer
            </p>
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Location Card */}
            <div className="animate-fade-in-left">
              <div className="bg-card rounded-2xl shadow-card overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={schoolImage}
                    alt="Firoda National School exterior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-sm font-medium text-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      Our Location
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <h2 className="font-heading font-bold text-2xl text-foreground mb-4">
                    Firoda National School
                  </h2>
                  
                  <address className="not-italic text-muted-foreground mb-6 leading-relaxed">
                    Skehana<br />
                    Castlecomer<br />
                    Co. Kilkenny<br />
                    R95 E22N, Ireland
                  </address>
                  
                  <Button asChild className="w-full" size="lg">
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                      Get Directions
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="space-y-6 animate-fade-in-right">
              <div className="bg-card rounded-2xl shadow-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl text-foreground">
                    Program Hours
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <div>
                      <p className="font-heading font-semibold text-foreground">Monday – Friday</p>
                      <p className="text-sm text-muted-foreground">During school term</p>
                    </div>
                    <p className="text-primary font-semibold text-lg">1:40 PM – 5:40 PM</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-heading font-semibold text-foreground">Saturday – Sunday</p>
                    </div>
                    <p className="text-muted-foreground font-medium">Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Holiday Note */}
              <div className="bg-secondary/10 rounded-xl p-6 border border-secondary/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">
                      School Holidays
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Hours may vary during school holidays. Please contact us for 
                      updated schedules during mid-term breaks, Christmas, Easter, 
                      and summer holidays.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="py-10">
        <div className="container">
          <div className="rounded-2xl overflow-hidden shadow-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2401.5!2d-7.4!3d52.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDQ4JzAwLjAiTiA3wrAyNCcwMC4wIlc!5e0!3m2!1sen!2sie!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Firoda National School Location"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Ready to Visit?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              We'd love to show you around and answer any questions you may have 
              about our after-school program.
            </p>
            <Button asChild size="lg" variant="hero">
              <Link to="/contact">
                Contact Us to Arrange a Visit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Location;
