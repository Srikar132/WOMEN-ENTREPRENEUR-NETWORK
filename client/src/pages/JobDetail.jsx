import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { apiClient } from '../lib/api-clinet';
import { HOST } from '../utils/constants';

const JobApplicationPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    salary: '',
    location: '',
    employmentType: '' 
  });

  const getJob = async () => {
    try {
      const response = await apiClient.get(`/api/job/get-job/${id}`, { withCredentials: true });
      setJob(response.data.job);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load job details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted form data:", formData);
  };

  if (loading) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="job-details">
        <h1 className="text-2xl font-bold">{job?.title}</h1>
        <p className="font-bold">{job?.category}</p>
        <p>{job?.description}</p>

        <h2 className="mt-4 text-xl font-semibold">About the Employer:</h2>
        <div className="rounded-full h-32 w-32 overflow-hidden">
             <img src={`${HOST}/${job?.employer?.profileImage}`} className="object-cover" alt="" />
          </div> 
        <ul className="ml-5 list-disc">
          <li>Name: {job?.employer?.name}</li>
          <li>Email: {job?.employer?.email}</li>
          <li>Mobile: {job?.employer?.contactInfo?.phone}</li>
        </ul>

        <h2 className="mt-4 text-xl font-semibold">Salary:</h2>
        <p>{job?.salary}</p>

        <h2 className="mt-4 text-xl font-semibold">Location:</h2>
        <p>{job?.location}</p>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold">Apply for this Job</h2>
        <form onSubmit={handleSubmit} className="mt-5">

          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Job Title"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Job Description"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Job Category"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="salary" className="block text-gray-700">Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Salary"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="Job Location"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="employmentType" className="block text-gray-700">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            >
              <option value="">Select Employment Type</option>
              <option value="full-time">Full-Time</option>
              <option value="part-time">Part-Time</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>

          <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApplicationPage;
