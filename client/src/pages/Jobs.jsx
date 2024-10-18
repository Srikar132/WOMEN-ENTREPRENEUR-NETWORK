import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GET_ALL_JOBS } from "../utils/constants";
import { toast } from "react-toastify";
import { AiOutlineSearch, AiOutlineArrowRight } from 'react-icons/ai';
import { apiClient } from '../lib/api-clinet';
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getJobs = async () => {
    try {
      const response = await apiClient.get(GET_ALL_JOBS, { withCredentials: true });
      setJobs(response.data.jobs);
    } catch (error) {
      toast.error("Failed to load jobs. Please try again later.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    return (
      (!category || job.category.toLowerCase().includes(category.toLowerCase())) &&
      (!searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <div className='h-[300px] flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center w-full p-5 bg-white/20 backdrop-blur-sm'>
          <motion.span
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className='text-xl font-bold tracking-wider sm:mr-20 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl'>
            Path Way to Employement
          </motion.span>
        </div>
      </div>

      <div className="flex flex-col bg-white">
        <div className="flex flex-wrap items-center justify-between w-full gap-5 px-3 py-5 sm:px-9 md:px-32 lg:px-80">
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 w-full p-2 tracking-widest transition duration-200 border border-gray-300 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400"
            >
              <option value="">Select a Category</option>
              <option value="success-stories">Success Stories</option>
              <option value="leadership-development">Leadership Development</option>
              <option value="business-funding">Business Funding</option>
              {/* Other categories */}
            </select>
          </div>

          <div className="flex items-center justify-center">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="search"
              type="text"
              className="flex-1 w-full p-2 transition duration-200 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus:border-blue-400"
            />
            <button className="border text-2xl focus:ring-4 h-[100%] px-2 py-2 text-blue-700 bg-white">
              <AiOutlineSearch />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center min-h-screen py-10 bg-gray-100">
        <div className="w-11/12 p-6 bg-white rounded-lg shadow-lg md:w-3/4 lg:w-1/2">
          <h1 className="mb-6 text-2xl font-semibold text-center">Urgently Hiring</h1>
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Link to={`/job/${job._id}`} key={job._id}>
                  <div className="flex items-center justify-between p-4 transition-colors duration-200 rounded-lg shadow bg-gray-50 hover:bg-gray-200">
                    <div>
                      <h2 className="text-xl font-semibold">{job.title}</h2>
                      <p className="text-sm text-gray-500">{job.category}</p>
                    </div>
                    <AiOutlineArrowRight className="text-blue-500" />
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500">No jobs available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
