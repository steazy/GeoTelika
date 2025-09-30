import { Link } from "wouter";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup clicked');
    // TODO: Implement newsletter signup
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white text-primary rounded-lg px-3 py-2 font-bold text-xl">
                G
              </div>
              <span className="font-bold text-xl">Geotelika</span>
            </div>
            <p className="text-primary-foreground/80 text-sm" data-testid="text-footer-description">
              Professional IT business services and support solutions for small to mid-size companies.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm" data-testid="text-footer-phone">
                <Phone className="h-4 w-4" />
                <span>(301) 660-8483</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg" data-testid="text-footer-services-title">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:text-white transition-colors" data-testid="link-footer-server-management">
                  Server Management
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors" data-testid="link-footer-cybersecurity">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors" data-testid="link-footer-cloud-solutions">
                  Cloud Solutions
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors" data-testid="link-footer-network">
                  Network Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/tickets" className="hover:text-white transition-colors" data-testid="link-footer-support">
                  24/7 Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg" data-testid="text-footer-support-title">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/tickets" className="hover:text-white transition-colors" data-testid="link-footer-create-ticket">
                  Create Ticket
                </Link>
              </li>
              <li>
                <Link href="/tickets" className="hover:text-white transition-colors" data-testid="link-footer-track-ticket">
                  Track Ticket
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors" data-testid="link-footer-contact">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors" data-testid="link-footer-about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg" data-testid="text-footer-contact-title">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2" data-testid="text-footer-address">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  514-A South Main Street<br />
                  Hinesville, GA 31313
                </span>
              </li>
              <li className="flex items-center space-x-2" data-testid="text-footer-email">
                <Mail className="h-4 w-4" />
                <span>support@geotelika.com</span>
              </li>
              <li className="flex items-start space-x-2" data-testid="text-footer-hours">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  Mon-Fri: 8AM-6PM PST<br />
                  24/7 Emergency Support
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-primary-foreground/80" data-testid="text-footer-copyright">
            © {currentYear} Geotelika. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors" data-testid="link-footer-privacy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors" data-testid="link-footer-terms">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}