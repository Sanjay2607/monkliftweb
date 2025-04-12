"use client";

import React, { useState } from 'react';
import { Menu, X, Users, Calendar } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-purple-600">Monklift</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#events" className="text-gray-600 hover:text-purple-600">Events</a>
            <a href="#classes" className="text-gray-600 hover:text-purple-600">Classes</a>
            <a href="#trainers" className="text-gray-600 hover:text-purple-600">Trainers</a>
            <a href="#contact" className="text-gray-600 hover:text-purple-600">Contact</a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-purple-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#events" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Events</a>
              <a href="#classes" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Classes</a>
              <a href="#trainers" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Trainers</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setSubscriptionStatus('error');
        return;
      }

      setSubscriptionStatus('success');
      setTimeout(() => {
        setShowSubscribeModal(false);
        setSubscriptionStatus('');
        setEmail('');
      }, 3000);

    } catch (error) {
      console.error('Error subscribing:', error);
      setSubscriptionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
            <button 
              onClick={() => setShowSubscribeModal(true)}
              className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-700"
            >
              Join Now
            </button>
          </div>
        </div>
      </section>

      <section id="events" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="/yoga.gif" 
                alt="Yoga" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Yoga</h3>
                <p className="text-gray-800 mb-4 text-lg">
                  <span className="font-bold">Date & Time:</span> To be announced
                </p>
                <p className="text-gray-800 mb-4 text-lg">
                  <span className="font-bold">Venue:</span> To be announced
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="/community.gif" 
                alt="Community Workout" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Community Workout</h3>
                <p className="text-gray-800 mb-4 text-lg">
                  <span className="font-bold">Date & Time:</span> To be announced
                </p>
                <p className="text-gray-800 mb-4 text-lg">
                  <span className="font-bold">Venue:</span> To be announced
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="/strength.gif" 
                alt="Strength Workout" 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">Strength Workout</h3>
                <p className="text-gray-800 mb-4 text-lg">
                  <span className="font-bold">Date & Time:</span> To be announced
                </p>
                <p className="text-gray-800 mb-4 text-lg">
                  <span className="font-bold">Venue:</span> To be announced
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Monklift?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Expert Trainers</h3>
              <p className="text-gray-700">Learn from certified professionals who are passionate about your success.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Flexible Schedule</h3>
              <p className="text-gray-700">Choose from multiple time slots that fit your busy lifestyle.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-purple-600 mb-2">Community Focus</h3>
              <p className="text-gray-700">Join a supportive community that motivates and inspires you.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold">Monklift</h3>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors">monkliftofficial@gmail.com</li>
                <li className="hover:text-white transition-colors">+91 91452 78388</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
              <a 
                href="https://www.instagram.com/monkliftofficial/?igsh=dmwybWRkZWlwbWpl" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>

      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Stay Updated</h2>
              <button 
                onClick={() => {
                  setShowSubscribeModal(false);
                  setSubscriptionStatus('');
                  setEmail('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            {subscriptionStatus === 'success' || subscriptionStatus === 'exists' ? (
              <div className="text-center py-4">
                <div className={`text-lg font-semibold mb-2 ${getStatusMessage()?.color}`}>
                  {getStatusMessage()?.title}
                </div>
                <p className="text-gray-600">
                  {getStatusMessage()?.message}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Enter your email to receive updates
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-2 focus:ring-purple-500
                      text-gray-800 text-lg font-medium placeholder-gray-400
                      bg-white"
                    required
                  />
                </div>
                {subscriptionStatus === 'error' && (
                  <p className="text-red-500 text-sm">
                    Please enter a valid email address
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-purple-600 text-white px-6 py-3 rounded-full text-lg 
                    hover:bg-purple-700 transition flex items-center justify-center
                    ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;