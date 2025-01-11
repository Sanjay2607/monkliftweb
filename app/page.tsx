"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, MapPin, ChevronRight, Menu, X, Phone, Mail } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.confirmationResult = null;
  // @ts-ignore
  window.recaptchaVerifier = null;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  // Add state for current user
  const [currentUser, setCurrentUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('+91');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');

  // Add useEffect to listen to auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignUp = () => {
    setShowSignUpModal(true);
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      if (error) throw error
      setShowSignUpModal(false)
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  };

  // Add sign out handler
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const setupRecaptcha = () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'normal',
          'callback': (response) => {
            console.log('reCAPTCHA verified'); // Debug log
            handlePhoneSignIn(response);
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired'); // Debug log
            setPhoneError('reCAPTCHA expired. Please try again.');
            if (window.recaptchaVerifier) {
              window.recaptchaVerifier.clear();
              window.recaptchaVerifier = null;
            }
          }
        });
      }
      console.log('Rendering reCAPTCHA...'); // Debug log
      return window.recaptchaVerifier.render();
    } catch (error) {
      console.error('Error setting up reCAPTCHA:', error);
      setPhoneError('Error setting up verification. Please refresh and try again.');
      return null;
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+[1-9]\d{10,14}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneSignIn = async (recaptchaResponse = null) => {
    try {
      setPhoneError('');
      console.log('Starting phone sign-in process...'); // Debug log
      console.log('Phone number:', phoneNumber); // Debug log

      if (!validatePhoneNumber(phoneNumber)) {
        setPhoneError('Please enter a valid phone number with country code (e.g., +919145278388)');
        return;
      }

      if (!window.recaptchaVerifier) {
        console.log('Setting up reCAPTCHA...'); // Debug log
        setupRecaptcha();
        return;
      }

      console.log('Initiating signInWithPhoneNumber...'); // Debug log
      
      // Add timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 60000); // 60 second timeout
      });

      const signInPromise = signInWithPhoneNumber(
        auth, 
        phoneNumber, 
        window.recaptchaVerifier
      );

      const confirmation = await Promise.race([signInPromise, timeoutPromise]);
      
      console.log('OTP sent successfully!'); // Debug log
      setConfirmationResult(confirmation);
      setShowOtpInput(true);
      
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } catch (error) {
      console.error('Detailed error:', error); // Detailed error logging
      console.error('Error code:', error.code); // Error code logging
      console.error('Error message:', error.message); // Error message logging

      if (error.message === 'Request timed out') {
        setPhoneError('Request timed out. Please check your internet connection and try again.');
      } else if (error.code === 'auth/network-request-failed') {
        setPhoneError('Network error. Please check your internet connection.');
      } else if (error.code === 'auth/billing-not-enabled') {
        setPhoneError('Service temporarily unavailable. Please try signing in with Google.');
      } else if (error.code === 'auth/invalid-recaptcha-response') {
        setPhoneError('Please complete the reCAPTCHA verification.');
      } else if (error.code === 'auth/invalid-phone-number') {
        setPhoneError('The phone number is invalid. Please check and try again.');
      } else if (error.code === 'auth/quota-exceeded') {
        setPhoneError('SMS quota exceeded. Please try again later.');
      } else if (error.code === 'auth/too-many-requests') {
        setPhoneError('Too many requests. Please try again later.');
      } else {
        setPhoneError(`Error sending OTP: ${error.message}`);
      }
      
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
  };

  const handleOtpVerification = async () => {
    try {
      setOtpError('');
      if (!otp || otp.length !== 6) {
        setOtpError('Please enter a valid 6-digit OTP');
        return;
      }

      await confirmationResult.confirm(otp);
      setShowSignUpModal(false);
      setShowOtpInput(false);
      setPhoneNumber('');
      setOtp('');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setOtpError('Invalid OTP. Please try again.');
    }
  };

  return (
    <>
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
              {currentUser ? (
                <div className="flex items-center gap-2">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-gray-600">{currentUser.email}</span>
                  )}
                  <button 
                    onClick={handleSignOut}
                    className="text-sm text-gray-600 hover:text-purple-600"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleSignUp}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700"
                >
                  Sign Up
                </button>
              )}
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
                {currentUser ? (
                  <div className="px-3 py-2">
                    <div className="flex items-center gap-2 mb-2">
                      {currentUser.photoURL ? (
                        <img 
                          src={currentUser.photoURL} 
                          alt="Profile" 
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <span className="text-gray-600">{currentUser.email}</span>
                      )}
                    </div>
                    <button 
                      onClick={handleSignOut}
                      className="text-gray-600 hover:text-purple-600"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleSignUp}
                    className="w-full text-left px-3 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Sign Up</h2>
              <button 
                onClick={() => setShowSignUpModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50"
              >
                <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              {!showOtpInput ? (
                <>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (!value.startsWith('+91')) {
                        value = '+91' + value.replace('+91', '');
                      }
                      value = '+91' + value.slice(3).replace(/\D/g, '');
                      setPhoneNumber(value);
                    }}
                    placeholder="Enter phone number (+91XXXXXXXXXX)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900"
                  />
                  {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
                  <div id="recaptcha-container" className="flex justify-center"></div>
                  <button 
                    onClick={() => handlePhoneSignIn()}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
                  >
                    <Phone size={20} />
                    Continue with Phone
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900"
                    maxLength={6}
                  />
                  {otpError && <p className="text-red-500 text-sm">{otpError}</p>}
                  <button 
                    onClick={handleOtpVerification}
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700"
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>
            <div id="recaptcha-container"></div>
          </div>
        </div>
      )}
    </>
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
                {event.title === "Morning Yoga Session" && (
                  <div className="mb-4 rounded-lg overflow-hidden h-48">
                    <img 
                      src="/yoga.gif" 
                      alt="Morning Yoga Session" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {event.title === "Strength Training Workshop" && (
                  <div className="mb-4 rounded-lg overflow-hidden h-48">
                    <img 
                      src="/strength.gif" 
                      alt="Strength Training Workshop" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {event.title === "Community Workout" && (
                  <div className="mb-4 rounded-lg overflow-hidden h-48">
                    <img 
                      src="/community.gif" 
                      alt="Community Workout" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
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
                {event.title === "Morning Yoga Session" ? (
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLScVYo-euQpbDOiWudkxdDrzIpR7Xqm6Tep1ZS84Hy94_DgFrQ/viewform"
                    className="mt-4 w-full bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 flex items-center justify-center"
                  >
                    Book Now
                    <ChevronRight size={18} className="ml-1" />
                  </a>
                ) : (
                  <button className="mt-4 w-full bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded-full hover:bg-purple-50 flex items-center justify-center">
                    Book Now
                    <ChevronRight size={18} className="ml-1" />
                  </button>
                )}
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
              <li>monkfitoffice@gmail.com</li>
              <li>+91 91452 78388</li>
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