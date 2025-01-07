"use client";

import React, { useState } from 'react';
import { Calendar, Users, Clock, MapPin, ChevronRight, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-purple-600">Monklift</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#events" className="text-gray-600 hover:text-purple-600">Events</a>
            <a href="#classes" className="text-gray-600 hover:text-purple-600">Classes</a>
            <a href="#trainers" className="text-gray-600 hover:text-purple-600">Trainers</a>
            <a href="#contact" className="text-gray-600 hover:text-purple-600">Contact</a>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-purple-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#events" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Events</a>
              <a href="#classes" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Classes</a>
              <a href="#trainers" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Trainers</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Contact</a>
              <button className="w-full text-left px-3 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const LandingPage = () => {
  const upcomingEvents = [
    {
      title: "Morning Yoga Session",
      date: "Feb 15",
      time: "7:00 AM",
      location: "Central Park",
      slots: 15
    },
    {
      title: "Strength Training Workshop",
      date: "Feb 18",
      time: "6:00 PM",
      location: "Main Studio",
      slots: 10
    },
    {
      title: "Community Workout",
      date: "Feb 20",
      time: "9:00 AM",
      location: "Beach Front",
      slots: 25
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:pt-32">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Body,<br />
            <span className="text-purple-600">Elevate Your Mind</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of fitness enthusiasts and experience the perfect blend of strength, flexibility, and mindfulness.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-700">
              Join Now
            </button>
            <button className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full text-lg hover:bg-purple-50">
              View Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                    {event.slots} slots
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Calendar size={18} className="mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock size={18} className="mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2" />
                    {event.location}
                  </div>
                </div>
                <button className="mt-4 w-full bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 flex items-center justify-center">
                  Book Now
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Monklift?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Trainers</h3>
              <p className="text-gray-600">Learn from certified professionals who are passionate about your success.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
              <p className="text-gray-600">Choose from multiple time slots that fit your busy lifestyle.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Focus</h3>
              <p className="text-gray-600">Join a supportive community that motivates and inspires you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Fitness Journey?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join Monklift today and transform your life with our expert-led fitness programs.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg hover:bg-gray-100">
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Monklift</h3>
            <p className="text-gray-400">Transform your body and mind with our expert-led fitness programs.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Classes</a></li>
              <li><a href="#" className="hover:text-white">Schedule</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Fitness Street</li>
              <li>contact@monklift.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;