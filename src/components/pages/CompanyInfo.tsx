"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export interface CompanyState {
  name: string;
  logo: string;
  teamDetails: string;
  testimonials: string;
  projects: string;
  executiveSummary: string;
  pricing: string;
  email: string;
  phone: string;
  website: string;
  userId: string;
}

const CompanyInfo = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [info, setInfo] = useState<CompanyState>({
    name: "",
    logo: "",
    teamDetails: "",
    testimonials: "",
    projects: "",
    executiveSummary: "",
    pricing: "",
    userId: "",
    email: "",
    phone: "",
    website: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/company", {
        name: info?.name,
        logo: info?.logo,
        teamDetails: info?.teamDetails,
        testimonials: info?.testimonials,
        projects: info?.projects,
        executiveSummary: info?.executiveSummary,
        pricing: info?.pricing,
        email: info?.email,
        phone: info?.phone,
        website: info?.website,
        userId,
      });
      if (res.status === 200) router.push("/generate-proposal");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block">Company Name</label>
        <input
          type="text"
          value={info?.name}
          onChange={(e) => setInfo({ ...info, name: e.target.value })}
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block">Logo URL</label>
        <input
          type="text"
          value={info?.logo}
          onChange={(e) => setInfo({ ...info, logo: e.target.value })}
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block">Team Details</label>
        <textarea
          value={info?.teamDetails}
          onChange={(e) => setInfo({ ...info, teamDetails: e.target.value })}
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block">Testimonials</label>
        <textarea
          value={info?.testimonials}
          onChange={(e) => setInfo({ ...info, testimonials: e.target.value })}
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block">Previous Projects</label>
        <textarea
          value={info?.projects}
          onChange={(e) => setInfo({ ...info, projects: e.target.value })}
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block">Executive Summary</label>
        <textarea
          value={info?.executiveSummary}
          onChange={(e) =>
            setInfo({ ...info, executiveSummary: e.target.value })
          }
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block">Pricing</label>
        <textarea
          value={info?.pricing}
          onChange={(e) => setInfo({ ...info, pricing: e.target.value })}
          className="w-full border p-2"
        />
      </div>
      <div>Contact Information</div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block">Email</label>
          <input
            type="text"
            value={info?.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Phone</label>
          <input
            type="text"
            value={info?.phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label className="block">Website</label>
          <input
            type="text"
            value={info?.website}
            onChange={(e) => setInfo({ ...info, website: e.target.value })}
            className="w-full border p-2"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default CompanyInfo;
