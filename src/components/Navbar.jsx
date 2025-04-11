import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiPlusCircle, FiBriefcase, FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActiveRoute = (path) => {
        return location.pathname === path;
    };

    // List of navigation links
    const navLinks = [
        { path: '/', name: 'Dashboard', icon: FiHome },
        { path: '/add-job', name: 'Add Job', icon: FiPlusCircle },
        { path: '/jobs', name: 'View Jobs', icon: FiBriefcase },
    ];

    return (
        <nav className="bg-white/80 border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center space-x-3">
                        <img src="/icon.svg" alt="Logo" className="h-10 w-10" />
                        <div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Student Job Tracker
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center px-4 py-2 rounded-xl transition-all duration-200 space-x-2
                  ${isActiveRoute(link.path)
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <link.icon className={`h-5 w-5 ${isActiveRoute(link.path) ? 'text-blue-600' : 'text-gray-500'}`} />
                                <span className="font-medium">{link.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden absolute left-0 right-0 top-20 bg-white border-b border-gray-100 shadow-lg">
                        <div className="container mx-auto px-4 py-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 space-x-3
                    ${isActiveRoute(link.path)
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <link.icon className={`h-5 w-5 ${isActiveRoute(link.path) ? 'text-blue-600' : 'text-gray-500'}`} />
                                    <span className="font-medium">{link.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;