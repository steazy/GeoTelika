import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  Server, 
  Shield, 
  Cloud, 
  Network,
  Database,
  HeadphonesIcon,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const detailedServices = [
  {
    icon: HeadphonesIcon,
    title: "24/7 IT Support",
    description: "Round-the-clock technical support with rapid response times and expert troubleshooting through our advanced ticketing system.",
    features: [
      "Immediate Issue Response",
      "Remote Technical Support",
      "On-site Assistance Available",
      "Priority Ticket Management",
      "Preventive Maintenance",
      "User Training & Support"
    ],
    pricing: "Starting at $99/month",
    popular: true
  },
  {
    icon: Shield,
    title: "Cybersecurity Solutions",
    description: "Advanced security measures to protect your business from evolving cyber threats with comprehensive monitoring and response capabilities.",
    features: [
      "Advanced Threat Detection",
      "Firewall Configuration",
      "Employee Security Training", 
      "Data Encryption Services",
      "Compliance Assistance",
      "Incident Response Planning"
    ],
    pricing: "Starting at $199/month",
    popular: true
  },
  {
    icon: Database,
    title: "Data Management",
    description: "Comprehensive data solutions including backup, recovery, and analytics to protect and leverage your business-critical information.",
    features: [
      "Automated Data Backups",
      "Database Optimization",
      "Data Recovery Services",
      "Business Intelligence",
      "Data Migration",
      "Compliance Management"
    ],
    pricing: "Starting at $129/month",
    popular: false
  },
  {
    icon: Network,
    title: "Network Infrastructure",
    description: "Robust networking solutions ensuring reliable connectivity, optimal performance, and seamless communication across your organization.",
    features: [
      "Network Design & Implementation",
      "WiFi Solutions",
      "VPN Setup & Management",
      "Network Security",
      "Bandwidth Optimization",
      "Remote Access Solutions"
    ],
    pricing: "Starting at $179/month",
    popular: false
  },
  {
    icon: Server,
    title: "Server Management",
    description: "Complete enterprise server solutions with proactive monitoring, maintenance, and optimization to ensure maximum uptime and performance.",
    features: [
      "24/7 Server Monitoring",
      "Automated Backup Solutions",
      "Performance Optimization",
      "Security Updates & Patches",
      "Disaster Recovery Planning",
      "Hardware Maintenance"
    ],
    pricing: "Starting at $299/month",
    popular: false
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description: "Scalable cloud solutions designed to grow with your business, offering flexibility, cost-efficiency, and enhanced collaboration.",
    features: [
      "Cloud Migration Services",
      "Multi-Cloud Management",
      "Cost Optimization",
      "Automated Scaling",
      "Data Synchronization",
      "Cloud Security"
    ],
    pricing: "Starting at $149/month",
    popular: false
  }
];

export default function ServicesPage() {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-services-page-title">
          Professional IT Services
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-services-page-description">
          Comprehensive technology solutions designed to support, protect, and scale your business operations with expert 24/7 support.
        </p>
        <Link href="/contact">
          <Button 
            size="lg" 
            data-testid="button-get-started"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {detailedServices.map((service, index) => (
          <Card 
            key={index} 
            className={`hover-elevate transition-all duration-300 relative ${
              service.popular ? 'ring-2 ring-primary' : ''
            }`}
            data-testid={`card-detailed-service-${index}`}
          >
            {service.popular && (
              <Badge 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground"
                data-testid={`badge-popular-${index}`}
              >
                Most Popular
              </Badge>
            )}
            
            <CardHeader>
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary text-primary-foreground rounded-lg p-3">
                  <service.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl" data-testid={`text-detailed-service-title-${index}`}>
                    {service.title}
                  </CardTitle>
                  <Badge variant="outline" className="mt-1" data-testid={`text-service-pricing-${index}`}>
                    {service.pricing}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground" data-testid={`text-detailed-service-description-${index}`}>
                {service.description}
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide">
                  What's Included:
                </h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-center text-sm"
                      data-testid={`text-detailed-service-feature-${index}-${featureIndex}`}
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4">
                <Link href="/contact">
                  <Button 
                    className="w-full" 
                    variant={service.popular ? "default" : "outline"}
                    data-testid={`button-detailed-get-quote-${index}`}
                  >
                    Get Custom Quote
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center bg-card rounded-lg p-8 border">
        <h2 className="text-2xl font-bold mb-4" data-testid="text-cta-title">
          Need a Custom Solution?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto" data-testid="text-cta-description">
          Every business is unique. Let our experts design a tailored IT solution that fits your specific needs and budget.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button 
              size="lg"
              data-testid="button-schedule-consultation"
            >
              Schedule Free Consultation
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => console.log('View case studies clicked')}
            data-testid="button-view-case-studies"
          >
            View Case Studies
          </Button>
        </div>
      </div>
    </div>
  );
}