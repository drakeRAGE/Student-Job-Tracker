import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiExternalLink, FiFilter, FiList } from 'react-icons/fi';

function JobList() {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [searchTerm, setSearchTerm] = useState('');

    // Dummy data , I will add database soon
    const jobs = [
        {
            id: 1,
            company: 'Google',
            role: 'Software Engineer',
            status: 'Interview',
            appliedDate: '2024-01-15',
            link: 'https://google.com/careers'
        },
        // Add more dummy data as needed
    ];

    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-600 via-blue-700 to-purple-700 rounded-[2rem] p-12 text-white relative overflow-hidden backdrop-blur-3xl">
                <div className="absolute inset-0 bg-pattern opacity-10"></div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 blur-3xl transform rotate-12 translate-x-1/2"></div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                        Job Applications
                    </h1>
                    <p className="text-blue-100 text-lg">Track and manage your career opportunities</p>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8 relative border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6 justify-between">
                    <div className="relative flex-1 max-w-md group">
                        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search companies or roles..."
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-50/80"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="relative group">
                            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            <select
                                className="pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-50/80 appearance-none min-w-[160px]"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="relative group">
                            <FiList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                            <select
                                className="pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-50/80 appearance-none min-w-[160px]"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="date">Sort by Date</option>
                                <option value="company">Sort by Company</option>
                                <option value="status">Sort by Status</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-100">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Company</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Applied Date</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {jobs.map(job => (
                                <tr key={job.id} className="hover:bg-gray-50/50 transition-all duration-200">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center font-semibold text-blue-600 text-xl border border-blue-200 mr-4">
                                                {job.company.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{job.company}</div>
                                                <a href={job.link} target="_blank" rel="noopener noreferrer"
                                                    className="text-sm text-blue-500 flex items-center hover:text-blue-600 transition-colors">
                                                    View posting <FiExternalLink className="ml-1.5" />
                                                </a>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-800">{job.role}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-4 py-1.5 rounded-xl text-sm font-medium inline-flex items-center ${job.status === 'Interview' ? 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200' :
                                                job.status === 'Offer' ? 'bg-green-100 text-green-700 ring-1 ring-green-200' :
                                                    job.status === 'Rejected' ? 'bg-red-100 text-red-700 ring-1 ring-red-200' :
                                                        'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(job.appliedDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-sm">
                                                <FiEdit2 className="w-5 h-5" />
                                            </button>
                                            <button className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-sm">
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default JobList;