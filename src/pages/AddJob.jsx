import React, { useState } from 'react';
import { FiBriefcase, FiUser, FiCalendar, FiLink, FiCheckCircle } from 'react-icons/fi';

function AddJob() {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        status: 'Applied',
        appliedDate: '',
        link: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // I will add the submission logic later
    };

    return (
        <div className="space-y-8">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-indigo-600 via-blue-700 to-purple-700 rounded-[2rem] p-12 text-white relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 blur-3xl transform rotate-12 translate-x-1/2"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                        Add New Application
                    </h1>
                    <p className="text-blue-100 text-lg">Track your next career opportunity</p>
                </div>
            </div>

            <div className="max-w-3xl mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-[2rem] transform rotate-1 blur-xl opacity-30"></div>
                <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8 relative border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="block text-gray-700 font-semibold text-sm uppercase tracking-wider" htmlFor="company">
                                Company Name
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-all duration-200">
                                    <FiBriefcase className="h-5 w-5 text-gray-400 group-hover:text-blue-500" />
                                </div>
                                <input
                                    type="text"
                                    id="company"
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-50/80"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="Enter company name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-gray-700 font-medium" htmlFor="role">
                                Role
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="role"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="Enter job role"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-gray-700 font-medium" htmlFor="status">
                                Status
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiCheckCircle className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    id="status"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Applied">Applied</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-gray-700 font-medium" htmlFor="appliedDate">
                                Application Date
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiCalendar className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="date"
                                    id="appliedDate"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={formData.appliedDate}
                                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium" htmlFor="link">
                            Job Link
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLink className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="url"
                                id="link"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                placeholder="https://example.com/job-posting"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 font-medium mt-8 relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                        <span className="relative">Add Application</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddJob;