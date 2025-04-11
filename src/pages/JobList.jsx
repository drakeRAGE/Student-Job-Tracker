import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiExternalLink, FiFilter, FiList, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import EditJobModal from '../components/EditJobModal';

function JobList() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL;

    // Fetch jobs from API
    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/jobs`);
            setJobs(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch jobs. Please try again later.');
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    // Add these functions
    const handleEdit = (job) => {
        setSelectedJob(job);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (updatedData) => {
        try {
            const response = await axios.put(`${apiUrl}/jobs/${selectedJob._id}`, updatedData);
            setJobs(jobs.map(job =>
                job._id === selectedJob._id ? response.data : job
            ));
            setIsEditModalOpen(false);
            setSelectedJob(null);
        } catch (err) {
            console.error('Error updating job:', err);
            alert('Failed to update job. Please try again.');
        }
    };

    // Update the delete handler with a custom confirmation dialog
    const handleDelete = async (id) => {
        const job = jobs.find(j => j._id === id);
        if (!job) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete the following job application?\n\nCompany: ${job.company}\nRole: ${job.role}`
        );

        if (confirmDelete) {
            try {
                await axios.delete(`${apiUrl}/jobs/${id}`);
                setJobs(jobs.filter(job => job._id !== id));
            } catch (err) {
                console.error('Error deleting job:', err);
                alert('Failed to delete job. Please try again.');
            }
        }
    };

    // Filter and sort jobs logic - DATA STRUCTURES PROBLEM
    const filteredJobs = jobs
        .filter(job => {
            if (filter === 'all') return true;
            return job.status === filter;
        })
        .filter(job => {
            const searchLower = searchTerm.toLowerCase();
            return job.company.toLowerCase().includes(searchLower) ||
                job.role.toLowerCase().includes(searchLower);
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'company':
                    return a.company.localeCompare(b.company);
                case 'status':
                    return a.status.localeCompare(b.status);
                default:
                    return 0;
            }
        });

    // Add loading and error states to the UI
    if (loading) {
        return (
            <div className="h-96 flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-3">Getting data...</span>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-600 text-center py-8">{error}</div>;
    }

    return (
        <div className="space-y-8">

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
                            {filteredJobs.map(job => (
                                <tr key={job._id} className="hover:bg-gray-50/50 transition-all duration-200">
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
                                        {new Date(job.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEdit(job)}
                                                className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:shadow-sm"
                                            >
                                                <FiEdit2 className="w-5 h-5" />
                                            </button>
                                            <EditJobModal
                                                job={selectedJob}
                                                isOpen={isEditModalOpen}
                                                onClose={() => {
                                                    setIsEditModalOpen(false);
                                                    setSelectedJob(null);
                                                }}
                                                onUpdate={handleUpdate}
                                            />
                                            <button
                                                onClick={() => handleDelete(job._id)}
                                                className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:shadow-sm"
                                            >
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