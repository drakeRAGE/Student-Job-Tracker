import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiUserPlus, FiList, FiAward, FiX, FiPlusCircle, FiDatabase, FiTrendingUp, FiCalendar, FiArrowUpRight } from 'react-icons/fi';
import { MdMoodBad } from "react-icons/md";
import axios from 'axios';

function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        applied: 0,
        interview: 0,
        offer: 0,
        rejected: 0
    });
    const [recentApplications, setRecentApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const apiUrl = import.meta.env.VITE_API_URL;


    // Function to fetch jobs
    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/jobs`);
            const jobs = response.data;

            // Calculate status frequencies
            const statusCount = jobs.reduce((acc, job) => {
                acc[job.status] = (acc[job.status] || 0) + 1;
                return acc;
            }, {});

            // Calculate success rate (Offers / Total Applications) * 100
            const successRate = jobs.length > 0
                ? Math.round((statusCount['Offer'] || 0) / jobs.length * 100)
                : 0;

            // Update stats
            setStats({
                total: jobs.length,
                applied: statusCount['Applied'] || 0,
                interview: statusCount['Interview'] || 0,
                offer: statusCount['Offer'] || 0,
                rejected: statusCount['Rejected'] || 0,
                successRate: successRate
            });

            // Get recent applications (last 3)
            const sortedJobs = jobs.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setRecentApplications(sortedJobs.slice(0, 3).map(job => ({
                company: job.company,
                role: job.role,
                date: job.createdAt,
                status: job.status
            })));

            setError(null);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setError('Failed to fetch dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // Add loading and error states to the UI
    if (loading) {
        return (
            <div className="min-h-[50vh] md:min-h-[60vh] flex flex-col md:flex-row justify-center items-center p-4 md:p-8">
                <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="mt-4 md:mt-0 md:ml-3 text-gray-600 text-sm md:text-base">Loading dashboard data...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[50vh] md:min-h-[60vh] flex justify-center items-center p-4 md:p-8">
                <div className="text-red-600 text-sm md:text-base flex items-center">
                    <FiX className="w-5 h-5 mr-2" />
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 p-4 sm:p-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-blue-700 to-purple-700 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-12 text-white relative overflow-hidden backdrop-blur-3xl">
                <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 mb-6">
                        <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                            <FiBriefcase className="h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                                Welcome Back!
                            </h1>
                            <p className="text-base sm:text-lg text-blue-100">Your job search journey continues</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-6 sm:mt-8">
                        <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-xl border border-white/20">
                            <FiTrendingUp className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                            <span className="text-base sm:text-lg">Success rate: {stats.successRate}%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                    { title: 'Total Applications', icon: FiBriefcase, count: stats.total, color: 'blue', desc: 'Applications submitted', trend: '+15%' },
                    { title: 'In Interview', icon: FiUserPlus, count: stats.interview, color: 'yellow', desc: 'Ongoing interviews', trend: '+8%' },
                    { title: 'Offers', icon: FiAward, count: stats.offer, color: 'green', desc: 'Offers received', trend: '+20%' },
                    { title: 'Rejected', icon: MdMoodBad, count: stats.rejected, color: 'red', desc: 'Applications rejected', trend: '-5%' }
                ].map((stat, index) => (
                    <div key={index}
                        className={`relative bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-6 backdrop-blur-xl
                            hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-1
                            border border-gray-100 group overflow-hidden`}>
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-100/20 rounded-full blur-3xl 
                            transform translate-x-16 -translate-y-8 group-hover:translate-x-8 transition-transform duration-500`}></div>

                        <div className="relative">
                            <div className="flex items-center justify-between">
                                <div className={`p-3 bg-${stat.color}-100 rounded-2xl 
                                        group-hover:scale-110 transition-transform duration-300
                                        shadow-sm shadow-${stat.color}-200`}>
                                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                                </div>
                                <span className={`text-sm font-medium px-3 py-1 rounded-full
                                        bg-${stat.color}-50 text-${stat.color}-700 border border-${stat.color}-100`}>
                                    {stat.title}
                                </span>
                            </div>

                            <div className="mt-6 space-y-2">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className={`text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent
                                                transform group-hover:scale-105 transition-transform duration-300`}>
                                            {stat.count}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">{stat.desc}</p>
                                    </div>
                                    <div className={`flex items-center ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                        } text-sm font-medium`}>
                                        <FiArrowUpRight className={`h-4 w-4 ${stat.trend.startsWith('+') ? 'rotate-0' : 'rotate-90'
                                            }`} />
                                        <span className="ml-1">{stat.trend}</span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}

            </div>

            {/* Recent Applications Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
                <div className="md:col-span-2 bg-white rounded-2xl sm:rounded-[1.5rem] p-4 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Recent Applications</h2>
                            <p className="text-sm sm:text-base text-gray-500">Your latest job applications</p>
                        </div>
                        <Link to="/jobs"
                            className="flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                            View all <FiList className="ml-2" />
                        </Link>
                    </div>
                    <div className="space-y-4 sm:space-y-6">
                        {recentApplications.map((app, index) => (
                            <div key={index}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 bg-gray-50/50 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors border border-gray-100 gap-4 sm:gap-0">
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center font-semibold text-blue-600 text-lg sm:text-xl border border-blue-200">
                                        {app.company.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{app.company}</h3>
                                        <p className="text-sm text-gray-500">{app.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-4 py-1.5 rounded-xl text-sm font-medium ${app.status === 'Interview' ? 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200' :
                                        app.status === 'Offer' ? 'bg-green-100 text-green-700 ring-1 ring-green-200' :
                                            'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
                                        }`}>
                                        {app.status}
                                    </span>
                                    <div className="text-sm text-gray-500 mt-2 flex items-center justify-end">
                                        <FiCalendar className="mr-1.5" size={14} />
                                        {new Date(app.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Cards */}
                <div className="space-y-4 sm:space-y-6">
                    <Link to="/add-job"
                        className="block bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white p-8 rounded-[1.5rem] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-pattern opacity-10"></div>
                        <div className="relative z-10">
                            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                <FiPlusCircle className="h-8 w-8 group-hover:rotate-90 transition-transform duration-300" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">Add New Application</h3>
                            <p className="text-blue-100">Start tracking a new job opportunity</p>
                        </div>
                    </Link>

                    <Link to="/jobs"
                        className="block bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white p-8 rounded-[1.5rem] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                        <div className="absolute inset-0 bg-pattern opacity-10"></div>
                        <div className="relative z-10">
                            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                <FiDatabase className="h-8 w-8 group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="text-2xl font-semibold mb-3">View All Applications</h3>
                            <p className="text-purple-100">Manage and track all your applications</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;