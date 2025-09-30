import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Menu, X, Settings, Home, Ticket, Phone, InfoIcon, LogOut, User, Play } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check authentication status
  const { data: authStatus, isLoading: authLoading } = useQuery({
    queryKey: ["/api/auth/session"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/auth/session");
      return await response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/auth/logout", {});
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      
      // Invalidate auth queries
      queryClient.invalidateQueries({ queryKey: ["/api/auth/session"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      
      // Redirect to home page
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: "Logout Failed",
        description: error.message || "Failed to logout. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isAuthenticated = authStatus?.authenticated === true;
  const user = authStatus?.user;

  // Dynamic nav items based on authentication status
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/services", label: "Services", icon: Settings },
    ...(isAuthenticated 
      ? [{ href: "/tickets", label: "Support Portal", icon: Ticket }]
      : [{ href: "/demo", label: "Request a Demo", icon: Play }]
    ),
    { href: "/about", label: "About", icon: InfoIcon },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer" data-testid="link-home">
              <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 font-bold text-xl">
                G
              </div>
              <span className="font-bold text-xl text-foreground">Geotelika</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors hover-elevate ${
                  location === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {authLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-pulse bg-muted rounded h-9 w-16"></div>
                <div className="animate-pulse bg-muted rounded h-9 w-24"></div>
              </div>
            ) : isAuthenticated ? (
              <>
                <Link href="/tickets">
                  <Button variant="outline" data-testid="button-create-ticket">
                    <Ticket className="mr-2 h-4 w-4" />
                    Support Portal
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full" data-testid="button-user-menu">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                          {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium text-sm" data-testid="text-username">
                          {user?.username || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          IT Support Account
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/tickets" className="w-full cursor-pointer" data-testid="menu-tickets">
                        <User className="mr-2 h-4 w-4" />
                        <span>Support Portal</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      disabled={logoutMutation.isPending}
                      data-testid="menu-logout"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{logoutMutation.isPending ? "Signing out..." : "Sign out"}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/auth">
                <Button data-testid="button-get-started">
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors hover-elevate ${
                    location === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`mobile-link-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {authLoading ? (
                  <div className="space-y-2">
                    <div className="animate-pulse bg-muted rounded h-9 w-full"></div>
                    <div className="animate-pulse bg-muted rounded h-9 w-full"></div>
                  </div>
                ) : isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 p-2 mb-2 bg-muted rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                          {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="font-medium text-sm" data-testid="mobile-text-username">
                          {user?.username || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          IT Support Account
                        </p>
                      </div>
                    </div>
                    <Link href="/tickets" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="justify-start w-full" data-testid="mobile-button-tickets">
                        <Ticket className="mr-2 h-4 w-4" />
                        Support Portal
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="justify-start w-full text-red-600 hover:text-red-600 hover:bg-red-50" 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      disabled={logoutMutation.isPending}
                      data-testid="mobile-button-logout"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {logoutMutation.isPending ? "Signing out..." : "Sign out"}
                    </Button>
                  </>
                ) : (
                  <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button className="justify-start w-full" data-testid="mobile-button-get-started">
                      Get Started
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}