'use client';

import Link from 'next/link';
import { Activity, Instagram, Github, Mail, Phone, Zap, Heart, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-white border-t border-gray-800">
      {/* Subtle Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA Section */}
        <div className="py-12 text-center border-b border-gray-800">
          <p className="text-gray-300 text-lg mb-2">
            You scrolled this far... might as well start tracking your fitness
          </p>
          <p className="text-gray-500 text-sm">
            (We promise it's easier than doing burpees)
          </p>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-8 w-8 text-white" />
              <span className="text-2xl font-bold text-white">Workout Health Tracker</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your personal fitness companion. Track workouts, monitor health metrics, and crush your goals.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/leonitish7"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-300 group-hover:text-pink-400 transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/dashboard/workouts" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Workouts
                </a>
              </li>
              <li>
                <a href="/dashboard/health" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Health Metrics
                </a>
              </li>
              <li>
                <a href="/dashboard/reports" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Reports
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <Zap className="h-4 w-4 group-hover:text-yellow-400 transition-colors" />
                  Getting Started
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <Heart className="h-4 w-4 group-hover:text-red-400 transition-colors" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <Mail className="h-4 w-4 group-hover:text-blue-400 transition-colors" />
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                  <Users className="h-4 w-4 group-hover:text-green-400 transition-colors" />
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:nt10nitish@gmail.com" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-gray-500 group-hover:text-blue-400 transition-colors" />
                  <span className="break-all">nt10nitish@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+917777032666" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 text-gray-500 group-hover:text-green-400 transition-colors" />
                  <span>+91 7777032666</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/leonitish7" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                >
                  <Instagram className="h-4 w-4 flex-shrink-0 text-gray-500 group-hover:text-pink-400 transition-colors" />
                  <span>@leonitish7</span>
                </a>
              </li>
              <li className="pt-2">
                <div className="text-gray-400 text-xs italic">
                  Questions? We're here to help! 💪
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Workout Health Tracker. Made with ❤️ and 💪
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
