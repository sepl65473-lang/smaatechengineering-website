import { useState, useEffect } from 'react';
import { companyProfile } from '../data/company';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
}

export const CareersView = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch jobs');
        return res.json();
      })
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Unable to load career opportunities at this time.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
          Join Our Engineering Team
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Help us build the next generation of cold storage IoT systems. 
          We are looking for passionate individuals who love solving complex problems.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Finding opportunities...</p>
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-8 text-center max-w-md mx-auto">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 bg-gray-800/50 rounded-2xl border border-gray-700">
          <p className="text-gray-400 text-xl font-medium mb-2">No open positions right now</p>
          <p className="text-gray-500">Check back soon or follow us on LinkedIn for updates.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map(job => (
            <div key={job.id} className="group bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-brand-500/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-brand-500/20 text-brand-400 text-xs font-semibold rounded-full">
                      {job.department}
                    </span>
                    <span className="text-gray-500 text-xs">{job.type}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-400 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 mt-1">{job.location}</p>
                </div>
                <button className="px-8 py-3 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500 transform hover:scale-105 transition-all shadow-lg shadow-brand-600/20">
                  Apply Now
                </button>
              </div>
              <div className="mt-6 border-t border-gray-700 pt-6 hidden group-hover:block animate-in fade-in duration-300">
                <p className="text-gray-400 mb-4">{job.description}</p>
                <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wider">Requirements</h4>
                <p className="text-gray-500 text-sm whitespace-pre-wrap">{job.requirements}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-20 border-t border-gray-700 pt-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Don't see a fit?</h2>
        <p className="text-gray-400 mb-8">Send your resume to <a href={`mailto:${companyProfile.email}`} className="text-brand-400 hover:underline">{companyProfile.email}</a> and we'll keep you in mind for future openings.</p>
      </div>
    </div>
  );
};
