import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Clock3,
  FileText,
  LoaderCircle,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Upload,
  Users,
} from 'lucide-react';

import { config } from '../config';
import { companyProfile } from '../data/company';

interface JobPosting {
  id: number;
  title: string;
  location: string;
  experience: string;
  employment_type: string;
  description: string;
}

interface FeedbackState {
  type: 'success' | 'error';
  message: string;
}

interface ApplicationFormState {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  cover_letter: string;
  honeypot: string;
}

const emptyFormState: ApplicationFormState = {
  full_name: '',
  email: '',
  phone: '',
  position: '',
  cover_letter: '',
  honeypot: '',
};

const allowedResumeExtensions = ['pdf', 'doc', 'docx'];
const maxResumeSizeInBytes = 2 * 1024 * 1024;

export function CareersView() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [formState, setFormState] = useState<ApplicationFormState>(emptyFormState);
  const applicationSectionRef = useRef<HTMLElement | null>(null);
  const [isAccessMenuOpen, setIsAccessMenuOpen] = useState(false);

  const selectedJob = jobs.find((job) => job.id === selectedJobId) ?? null;

  useEffect(() => {
    let isDisposed = false;

    const loadJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch current job openings.');
        }

        const data = (await response.json()) as JobPosting[];
        if (isDisposed) {
          return;
        }

        setJobs(data);

        if (data.length > 0) {
          setSelectedJobId(data[0].id);
          setFormState((current) => ({
            ...current,
            position: current.position || data[0].title,
          }));
        }
      } catch (error) {
        console.error(error);
        if (!isDisposed) {
          setLoadError('Current openings could not be loaded right now. You can still reach us directly through email or phone.');
        }
      } finally {
        if (!isDisposed) {
          setLoading(false);
        }
      }
    };

    void loadJobs();

    return () => {
      isDisposed = true;
    };
  }, []);

  const scrollToApplication = () => {
    applicationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSelectJob = (job: JobPosting) => {
    setSelectedJobId(job.id);
    setFormState((current) => ({
      ...current,
      position: job.title,
    }));
    setFeedback(null);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setFeedback(null);

    if (!file) {
      setResumeFile(null);
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!allowedResumeExtensions.includes(fileExtension)) {
      setResumeFile(null);
      event.target.value = '';
      setFeedback({
        type: 'error',
        message: 'Resume must be uploaded as PDF, DOC, or DOCX.',
      });
      return;
    }

    if (file.size > maxResumeSizeInBytes) {
      setResumeFile(null);
      event.target.value = '';
      setFeedback({
        type: 'error',
        message: 'Resume file size must stay within 2 MB.',
      });
      return;
    }

    setResumeFile(file);
  };

  const requestCsrfToken = async () => {
    const response = await fetch('/api/csrf-token');
    if (!response.ok) {
      throw new Error('Security token request failed.');
    }

    const data = (await response.json()) as { csrfToken?: string };
    if (!data.csrfToken) {
      throw new Error('Security token missing.');
    }

    return data.csrfToken;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    if (!formState.position) {
      setFeedback({
        type: 'error',
        message: 'Please select the role you want to apply for.',
      });
      return;
    }

    if (!resumeFile) {
      setFeedback({
        type: 'error',
        message: 'Please attach your resume before submitting the application.',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const csrfToken = await requestCsrfToken();
      const payload = new FormData();
      payload.append('full_name', formState.full_name);
      payload.append('email', formState.email);
      payload.append('phone', formState.phone);
      payload.append('position', formState.position);
      payload.append('cover_letter', formState.cover_letter);
      payload.append('honeypot', formState.honeypot);
      payload.append('resume', resumeFile);

      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        body: payload,
      });

      const result = (await response.json()) as { success?: string; error?: string };

      if (!response.ok) {
        throw new Error(result.error || 'Application could not be submitted.');
      }

      setFeedback({
        type: 'success',
        message: result.success || 'Application submitted successfully.',
      });
      setFormState({
        ...emptyFormState,
        position: jobs.find((job) => job.id === selectedJobId)?.title ?? '',
      });
      setResumeFile(null);
      const resumeInput = document.getElementById('career-resume-upload') as HTMLInputElement | null;
      if (resumeInput) {
        resumeInput.value = '';
      }
    } catch (error) {
      console.error(error);
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Application could not be submitted.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-900 text-white">
      <Helmet>
        <title>Careers | Smaatech Engineering Group</title>
        <meta
          name="description"
          content="Explore current job openings at Smaatech Engineering Group and apply through our structured careers page."
        />
      </Helmet>

      <section className="relative overflow-hidden border-b border-white/5 pt-32 pb-20">
        <div className="absolute inset-0 bg-space-900" />
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-brand-500/10 blur-[130px]" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-accent-500/10 blur-[150px]" />

        <div className="container-custom relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_380px] lg:items-start">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-brand-300">
                Careers
              </div>

              <h1 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                Build practical engineering work that reaches real sites, real systems, and real operations.
              </h1>

              <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-slate-400 md:text-xl">
                Explore open roles across engineering, project execution, field operations, and support teams. Applicants can review current openings, choose a suitable role, and submit documents through a clear professional hiring flow.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {['Engineering Roles', 'Field Operations', 'Structured Applications'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button type="button" onClick={scrollToApplication} className="btn-primary">
                  Apply for Open Roles
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <a href={`mailto:${companyProfile.email}`} className="btn-secondary">
                  Contact Hiring Team
                </a>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="relative mb-6">
                <button
                  type="button"
                  onClick={() => setIsAccessMenuOpen((current) => !current)}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-space-950/50 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:border-brand-500/30"
                >
                  <span className="inline-flex items-center gap-2">
                    <LockKeyhole className="h-4 w-4 text-brand-400" />
                    Client Career Control
                  </span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isAccessMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isAccessMenuOpen && (
                  <div className="mt-3 rounded-2xl border border-white/10 bg-space-950/90 p-3">
                    <p className="px-3 pb-2 text-xs uppercase tracking-[0.22em] text-slate-500">Authorized Client Access</p>
                    <a
                      href={config.careersAdminUrl}
                      className="block rounded-xl px-3 py-3 text-sm text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      Client Login
                    </a>
                    <p className="px-3 pt-2 text-xs leading-relaxed text-slate-500">
                      This opens the protected hiring dashboard login. Public visitors can continue using the careers page normally, while authorized client access stays separate.
                    </p>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-white">What applicants can expect</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <BriefcaseBusiness className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                  <div>
                    <p className="font-semibold text-white">Live openings only</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">
                      Only currently active roles should appear here, helping applicants apply to real openings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                  <div>
                    <p className="font-semibold text-white">Structured submission</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">
                      Applications are submitted with role selection and resume upload through the dedicated careers flow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-400" />
                  <div>
                    <p className="font-semibold text-white">Clear hiring contact</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">
                      When needed, applicants can also reach the team directly using the published Smaatech contact details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-space-950/50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Hiring Contact</p>
                <div className="mt-4 space-y-3 text-sm">
                  <a href={`mailto:${companyProfile.email}`} className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white">
                    <Mail className="h-4 w-4 text-brand-400" />
                    <span>{companyProfile.email}</span>
                  </a>
                  <a href={companyProfile.phoneHref} className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white">
                    <Phone className="h-4 w-4 text-brand-400" />
                    <span>{companyProfile.phoneCompact}</span>
                  </a>
                  <div className="flex items-start gap-3 text-slate-300">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
                    <span>{companyProfile.registeredOffice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20">
        <div className="container-custom">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Current Openings</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Open positions from the Smaatech hiring flow</h2>
              <p className="mt-3 max-w-2xl text-base font-light leading-relaxed text-slate-400">
                Browse available roles, review the requirements, and use the form below to submit your application without leaving the main site experience.
              </p>
            </div>

            {!loading && !loadError && (
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                {jobs.length} active role{jobs.length === 1 ? '' : 's'}
              </div>
            )}
          </div>

          {loading ? (
            <div className="glass-card flex flex-col items-center justify-center py-20 text-center">
              <LoaderCircle className="h-10 w-10 animate-spin text-brand-400" />
              <p className="mt-4 text-base text-slate-400">Loading current positions...</p>
            </div>
          ) : loadError ? (
            <div className="glass-card p-8 text-center">
              <p className="text-lg font-semibold text-white">Open roles are temporarily unavailable</p>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">{loadError}</p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <a href={`mailto:${companyProfile.email}`} className="btn-primary">
                  Email Hiring Team
                </a>
                <a href={companyProfile.phoneHref} className="btn-secondary">
                  Call Us
                </a>
              </div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="glass-card p-10 text-center">
              <p className="text-lg font-semibold text-white">No open positions at the moment</p>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                The hiring list is currently empty. Applicants can still connect with the Smaatech team directly for future opportunities.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
                <a href={`mailto:${companyProfile.email}`} className="btn-primary">
                  Share Resume by Email
                </a>
                <a href={companyProfile.phoneHref} className="btn-secondary">
                  Speak to Our Team
                </a>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_380px]">
              <div className="grid gap-5">
                {jobs.map((job) => {
                  const isActive = selectedJobId === job.id;

                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => handleSelectJob(job)}
                      className={`rounded-3xl border p-6 text-left transition-all duration-300 ${
                        isActive
                          ? 'border-brand-500/40 bg-brand-500/10 shadow-[0_18px_45px_-28px_rgba(16,185,129,0.55)]'
                          : 'border-white/10 bg-space-800/50 hover:border-white/20 hover:bg-space-800/80'
                      }`}
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="max-w-3xl">
                          <div className="flex flex-wrap gap-2">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-300">
                              {job.employment_type}
                            </span>
                            <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-300">
                              Hiring
                            </span>
                          </div>

                          <h3 className="mt-4 text-2xl font-bold text-white">{job.title}</h3>

                          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400">
                            <span className="inline-flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-brand-400" />
                              {job.location}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <Clock3 className="h-4 w-4 text-brand-400" />
                              {job.experience}
                            </span>
                          </div>

                          <p className="mt-5 text-sm leading-relaxed text-slate-400">{job.description}</p>
                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold text-brand-300">
                          {isActive ? 'Selected role' : 'View role'}
                          <ArrowRight className={`h-4 w-4 transition-transform ${isActive ? 'translate-x-1' : ''}`} />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <aside className="xl:sticky xl:top-28">
                {selectedJob && (
                  <div className="glass-card p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Selected Position</p>
                    <h3 className="mt-3 text-2xl font-bold text-white">{selectedJob.title}</h3>

                    <div className="mt-5 space-y-3 text-sm text-slate-300">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-brand-400" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock3 className="h-4 w-4 text-brand-400" />
                        <span>{selectedJob.experience}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-brand-400" />
                        <span>{selectedJob.employment_type}</span>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-space-950/50 p-5">
                      <p className="text-sm leading-relaxed text-slate-400">{selectedJob.description}</p>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button type="button" onClick={scrollToApplication} className="btn-primary w-full">
                        Apply for This Role
                        <Send className="ml-2 h-4 w-4" />
                      </button>
                      <a href={`mailto:${companyProfile.email}?subject=Career%20Query%20-%20${encodeURIComponent(selectedJob.title)}`} className="btn-secondary w-full">
                        Ask Before Applying
                      </a>
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      </section>

      {jobs.length > 0 && !loadError && (
        <section ref={applicationSectionRef} className="border-t border-white/5 py-20">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_360px]">
              <div className="glass-card p-8 md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">Application Form</p>
                <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Submit your application</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                  Complete the details below and upload your resume. Your application will be submitted through the Smaatech recruitment workflow for the selected opening.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">Full Name</span>
                      <input
                        type="text"
                        name="full_name"
                        value={formState.full_name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-white/10 bg-space-950/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-brand-500/50"
                        placeholder="Enter your full name"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">Email Address</span>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-white/10 bg-space-950/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-brand-500/50"
                        placeholder="name@example.com"
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">Phone Number</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-white/10 bg-space-950/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-brand-500/50"
                        placeholder="Enter your phone number"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-medium text-slate-300">Position</span>
                      <select
                        name="position"
                        value={formState.position}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-white/10 bg-space-950/60 px-4 py-3 text-white outline-none transition-colors focus:border-brand-500/50"
                      >
                        <option value="">Select a position</option>
                        {jobs.map((job) => (
                          <option key={job.id} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-300">Resume</span>
                    <div className="rounded-3xl border border-dashed border-white/15 bg-space-950/40 p-5">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-3">
                          <Upload className="mt-0.5 h-5 w-5 text-brand-400" />
                          <div>
                            <p className="text-sm font-semibold text-white">Upload PDF, DOC, or DOCX</p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500">Maximum file size: 2 MB</p>
                          </div>
                        </div>
                        <label htmlFor="career-resume-upload" className="btn-secondary cursor-pointer">
                          Choose File
                        </label>
                      </div>

                      <input
                        id="career-resume-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeChange}
                        className="hidden"
                      />

                      <p className="mt-4 text-sm text-slate-400">
                        {resumeFile ? resumeFile.name : 'No file selected yet'}
                      </p>
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-300">Cover Letter</span>
                    <textarea
                      name="cover_letter"
                      value={formState.cover_letter}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full rounded-2xl border border-white/10 bg-space-950/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-brand-500/50"
                      placeholder="Tell the hiring team about your experience, availability, or role interest."
                    />
                  </label>

                  <input
                    type="text"
                    name="honeypot"
                    value={formState.honeypot}
                    onChange={handleInputChange}
                    autoComplete="off"
                    tabIndex={-1}
                    className="hidden"
                    aria-hidden="true"
                  />

                  {feedback && (
                    <div
                      className={`rounded-2xl border px-4 py-3 text-sm ${
                        feedback.type === 'success'
                          ? 'border-brand-500/30 bg-brand-500/10 text-brand-200'
                          : 'border-red-500/30 bg-red-500/10 text-red-200'
                      }`}
                    >
                      {feedback.message}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:pointer-events-none disabled:opacity-70">
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                    {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                  </button>
                </form>
              </div>

              <aside className="space-y-5">
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold text-white">Before you apply</h3>
                  <div className="mt-5 space-y-4 text-sm text-slate-400">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
                      <p>Keep your resume updated and relevant to the selected role.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
                      <p>One structured submission is better than multiple duplicate applications for the same opening.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-400" />
                      <p>Use the position selector carefully so the hiring team receives your application under the correct role.</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold text-white">Need help with applying?</h3>
                  <div className="mt-5 space-y-3 text-sm">
                    <a href={`mailto:${companyProfile.email}`} className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white">
                      <Mail className="h-4 w-4 text-brand-400" />
                      <span>{companyProfile.email}</span>
                    </a>
                    <a href={companyProfile.phoneHref} className="flex items-center gap-3 text-slate-300 transition-colors hover:text-white">
                      <Phone className="h-4 w-4 text-brand-400" />
                      <span>{companyProfile.phoneCompact}</span>
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
