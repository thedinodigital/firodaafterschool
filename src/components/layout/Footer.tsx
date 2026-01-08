import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Clock, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg">F</span>
              </div>
              <div>
                <span className="font-heading font-bold text-lg">Firoda</span>
                <span className="font-heading font-medium text-lg text-primary"> Afterschool</span>
              </div>
            </div>
            <p className="text-footer-muted text-sm leading-relaxed mb-4">
              A structured, nurturing afterschool environment where children can complete homework, enjoy creative activities, and build positive social connections.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-footer-muted">NCS Supported Program</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Our Program", href: "/about" },
                { name: "Meet the Founder", href: "/founder" },
                { name: "Location & Hours", href: "/location" },
                { name: "Funding & Support", href: "/funding" },
                { name: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-footer-muted hover:text-footer-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-footer-muted text-sm">
                  Firoda National School<br />
                  Skehana, Castlecomer<br />
                  R95 E22N, Ireland
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:firodaafterschool@gmail.com" className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                  firodaafterschool@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:0876809119" className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                  087 680 9119
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Program Hours</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-secondary flex-shrink-0" />
                <div className="text-sm">
                  <span className="text-footer-foreground">Monday – Friday</span>
                  <br />
                  <span className="text-footer-muted">1:40 PM – 5:40 PM</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-footer-muted flex-shrink-0" />
                <div className="text-sm">
                  <span className="text-footer-foreground">Weekends</span>
                  <br />
                  <span className="text-footer-muted">Closed</span>
                </div>
              </li>
            </ul>
            <p className="text-footer-muted text-xs mt-4">
              *Hours may vary during school holidays
            </p>
          </div>
        </div>

        <div className="border-t border-footer-muted/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-footer-muted text-sm">
            © {new Date().getFullYear()} Firoda Afterschool. All rights reserved.
          </p>
          <p className="text-footer-muted text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-secondary" />
            Quality Childcare · NCS Supported
          </p>
        </div>
      </div>
    </footer>
  );
}
