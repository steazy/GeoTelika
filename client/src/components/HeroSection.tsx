import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/Modern_tech_office_hero_e5f6e21f.png";
import CountUpAnimation from "@/components/CountUpAnimation";

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(220 85% 25% / 0.9) 0%, hsl(220 60% 35% / 0.8) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
            Enterprise IT Solutions
            <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 text-white/90">
              Made Simple
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-description">
            Geotelika provides comprehensive IT business services to small and mid-size companies with 24/7 support, advanced issue tracking, and expert technical solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/tickets">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg"
                data-testid="button-hero-create-ticket"
              >
                Create Support Ticket
              </Button>
            </Link>
            <Link href="/services">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-6 text-lg"
                data-testid="button-hero-learn-more"
              >
                Learn More About Our Services
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 mb-8 md:mb-0 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/90">
            <div className="text-center" data-testid="stat-tickets">
              <CountUpAnimation 
                end={156} 
                duration={2500}
                suffix="+"
                className="text-3xl font-bold text-white"
              />
              <div className="text-sm uppercase tracking-wide">Tickets Resolved</div>
            </div>
            <div className="text-center" data-testid="stat-uptime">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm uppercase tracking-wide">Uptime Guarantee</div>
            </div>
            <div className="text-center" data-testid="stat-response">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm uppercase tracking-wide">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}