import React from 'react';
import { Link } from 'react-router-dom';
import { FiBriefcase, FiUserPlus, FiList, FiAward, FiX, FiPlusCircle, FiDatabase, FiTrendingUp, FiCalendar, FiArrowUpRight } from 'react-icons/fi';
import { MdMoodBad } from "react-icons/md";
function Dashboard() {
    const stats = {
        total: 10,
        applied: 5,
        interview: 3,
        offer: 1,
        rejected: 1
    };

    const recentApplications = [
        { company: 'Microsoft', role: 'Frontend Developer', date: '2024-01-20', status: 'Interview' },
        { company: 'Amazon', role: 'Software Engineer', date: '2024-01-18', status: 'Applied' },
        { company: 'Meta', role: 'React Developer', date: '2024-01-15', status: 'Offer' },
    ];

    return (
        <div className="space-y-8 p-6">
            <div className="bg-gradient-to-r from-indigo-600 via-blue-700 to-purple-700 rounded-[2rem] p-12 text-white relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 blur-3xl transform rotate-12 translate-x-1/2"></div>
                <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center">
                            <FiBriefcase className="h-8 w-8" />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                                Welcome Back!
                            </h1>
                            <p className="text-blue-100 text-lg">Your job search journey continues</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-6 mt-8">
                        <div className="inline-flex items-center px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20">
                            <FiTrendingUp className="mr-3 h-5 w-5" />
                            <span className="text-lg">Success rate: 40%</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-white rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-1">Recent Applications</h2>
                            <p className="text-gray-500">Your latest job applications</p>
                        </div>
                        <Link to="/jobs"
                            className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                            View all <FiList className="ml-2" />
                        </Link>
                    </div>
                    <div className="space-y-6">
                        {recentApplications.map((app, index) => (
                            <div key={index}
                                className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center font-semibold text-blue-600 text-xl border border-blue-200">
                                        {app.company.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-lg">{app.company}</h3>
                                        <p className="text-gray-500">{app.role}</p>
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

                <div className="space-y-6">
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