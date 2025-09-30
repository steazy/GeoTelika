import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Target, Award, Clock, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6" data-testid="heading-about-title">
          About Geotelika
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-about-subtitle">
          We are a comprehensive IT business services platform dedicated to empowering small to mid-size companies with cutting-edge technology solutions and exceptional support.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="h-full" data-testid="card-mission">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To bridge the technology gap for growing businesses by providing enterprise-level IT solutions that are accessible, reliable, and tailored to each company's unique needs.
            </p>
          </CardContent>
        </Card>

        <Card className="h-full" data-testid="card-vision">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              To become the trusted technology partner that enables small and medium businesses to compete and thrive in an increasingly digital world.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* What We Do */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8" data-testid="heading-what-we-do">
          What We Do
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card data-testid="card-it-services">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                IT Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive IT solutions including infrastructure setup, cloud migration, cybersecurity, and ongoing technical support.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" data-testid="badge-cloud">Cloud Solutions</Badge>
                <Badge variant="secondary" data-testid="badge-security">Cybersecurity</Badge>
                <Badge variant="secondary" data-testid="badge-infrastructure">Infrastructure</Badge>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-support-platform">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Support Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Enterprise-grade ticket management system that ensures quick resolution of IT issues and seamless communication.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" data-testid="badge-ticketing">Issue Tracking</Badge>
                <Badge variant="secondary" data-testid="badge-communication">24/7 Support</Badge>
                <Badge variant="secondary" data-testid="badge-reporting">Analytics</Badge>
              </div>
            </CardContent>
          </Card>

          <Card data-testid="card-consultation">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Consultation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Strategic technology planning and expert guidance to help businesses make informed decisions about their IT investments.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" data-testid="badge-strategy">IT Strategy</Badge>
                <Badge variant="secondary" data-testid="badge-planning">Planning</Badge>
                <Badge variant="secondary" data-testid="badge-optimization">Optimization</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Approach */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8" data-testid="heading-our-approach">
          Our Approach
        </h2>
        <div className="max-w-4xl mx-auto">
          <Card data-testid="card-approach">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Responsive & Reliable
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We understand that downtime costs money. Our integrated support system ensures rapid response times and proactive monitoring to keep your business running smoothly.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Tailored Solutions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every business is unique. We take the time to understand your specific challenges and goals, delivering customized IT solutions that grow with your company.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Who We Serve */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8" data-testid="heading-who-we-serve">
          Who We Serve
        </h2>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Geotelika specializes in serving small to mid-size companies across various industries. Whether you're a growing startup, an established local business, or a regional enterprise, we have the expertise and resources to support your technology needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="px-4 py-2" data-testid="badge-startups">Growing Startups</Badge>
            <Badge variant="outline" className="px-4 py-2" data-testid="badge-small-business">Small Businesses</Badge>
            <Badge variant="outline" className="px-4 py-2" data-testid="badge-mid-size">Mid-Size Companies</Badge>
            <Badge variant="outline" className="px-4 py-2" data-testid="badge-regional">Regional Enterprises</Badge>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-muted/30 rounded-lg p-12" data-testid="section-cta">
        <h2 className="text-2xl font-bold mb-4" data-testid="heading-cta">
          Ready to Transform Your IT Infrastructure?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Let's discuss how Geotelika can help your business achieve its technology goals. Our expert team is ready to provide the support and solutions you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover-elevate active-elevate-2 transition-colors"
            data-testid="link-contact-us"
          >
            Contact Us Today
          </a>
          <a 
            href="/services" 
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 font-medium hover-elevate active-elevate-2 transition-colors"
            data-testid="link-our-services"
          >
            View Our Services
          </a>
        </div>
      </div>
    </div>
  );
}