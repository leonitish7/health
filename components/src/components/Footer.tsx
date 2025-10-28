import { Activity, Facebook, Instagram, Twitter, Youtube, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const menuLinks = [
    { name: "Menu", path: "/" },
    { name: "Features", path: "/analytics" },
    { name: "Subscription", path: "#" },
    { name: "Family Plan", path: "#" },
    { name: "Subscription Partnerships", path: "#" },
    { name: "Student Discount", path: "#" },
    { name: "Teacher, Military & Medical Discount (US Only)", path: "#" },
    { name: "Send a Gift", path: "#" },
  ];

  const routesLinks = [
    { name: "Routes", path: "/activities" },
    { name: "About", path: "#" },
    { name: "Stories", path: "#" },
    { name: "Support", path: "#" },
    { name: "Careers", path: "#" },
    { name: "Press", path: "#" },
    { name: "Business", path: "#" },
    { name: "Partner Center", path: "#" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
    { name: "Instagram", icon: Instagram, url: "https://instagram.com/lwonitish7" },
    { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
    { name: "Youtube", icon: Youtube, url: "https://youtube.com" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl">
              <Activity className="w-6 h-6 text-primary" />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Workout Health Track
              </span>
            </Link>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a href="tel:7777032666" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>7777032666</span>
              </a>
              <a href="mailto:nt10nitish@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>nt10nitish@gmail.com</span>
              </a>
              <a href="https://instagram.com/lwonitish7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
                <span>@lwonitish7</span>
              </a>
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Menu</h3>
            <ul className="space-y-2">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Routes Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              {routesLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Started & Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get Started</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Download on App Store
                </a>
              </li>
              <li>
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Get it on Google Play
                </a>
              </li>
            </ul>
            
            {/* Social Icons */}
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Workout Health Track. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
