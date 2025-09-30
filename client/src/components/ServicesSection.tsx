import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Server, 
  Shield, 
  Cloud, 
  Wrench, 
  Monitor, 
  Database,
  Network,
  HeadphonesIcon
} from "lucide-react";

const services = [
  {
    icon: HeadphonesIcon,
    title: "24/7 IT Support",
    description: "Round-the-clock technical support with our integrated ticket management system.",
    features: ["Instant Ticket Creation", "Priority Support", "Remote Assistance"]
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Comprehensive security solutions to protect your business from threats and data breaches.",
    features: ["Threat Detection", "Data Encryption", "Security Audits"]
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Secure data backup, recovery, and management solutions for business continuity.",
    features: ["Automated Backups", "Disaster Recovery", "Data Analytics"]
  },
  {
    icon: Network,
    title: "Network Infrastructure",
    description: "Design and implementation of robust network systems for reliable connectivity.",
    features: ["Network Design", "WiFi Setup", "VPN Configuration"]
  },
  {
    icon: Server,
    title: "Server Management",
    description: "Complete server setup, maintenance, and monitoring for optimal performance and reliability.",
    features: ["24/7 Monitoring", "Regular Maintenance", "Performance Optimization"]
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Seamless cloud migration and management services for scalable, flexible infrastructure.",
    features: ["Cloud Migration", "Backup Solutions", "Scalability Planning"]
  }
];

export default function ServicesSection() {

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground" data-testid="text-services-title">
            Our IT Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-services-description">
            Comprehensive technology solutions designed to support and scale your business operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-service-${index}`}>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl font-semibold" data-testid={`text-service-title-${index}`}>
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground" data-testid={`text-service-description-${index}`}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="text-sm text-muted-foreground flex items-center justify-center"
                      data-testid={`text-service-feature-${index}-${featureIndex}`}
                    >
                      <Monitor className="h-4 w-4 mr-2 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button 
                    variant="outline" 
                    className="w-full mt-6"
                    data-testid={`button-get-quote-${index}`}
                  >
                    Get Quote
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/services">
            <Button 
              size="lg" 
              data-testid="button-view-all-services"
            >
              <Wrench className="mr-2 h-5 w-5" />
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}