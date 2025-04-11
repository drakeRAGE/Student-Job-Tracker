import React, { useState, useEffect } from 'react';
import { FiX, FiBriefcase, FiUser, FiCalendar, FiLink, FiCheckCircle } from 'react-icons/fi';

function EditJobModal({ job, isOpen, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        status: '',
        link: ''
    });

    useEffect(() => {
        if (job) {
            setFormData({
                company: job.company || '',
                role: job.role || '',
                status: job.status || 'Applied',
                link: job.link || ''
            });
        }
    }, [job]);

    // Update job functionality
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onUpdate(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full mx-4 relative border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <FiX className="w-6 h-6 text-gray-400" />
                </button>

                <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Edit Job Application
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiBriefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiUser className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiCheckCircle className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Offer">Offer</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Link</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLink className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="url"
                                value={formData.link}
                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://example.com/job-posting"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:opacity-90 font-medium transition-opacity"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditJobModal;