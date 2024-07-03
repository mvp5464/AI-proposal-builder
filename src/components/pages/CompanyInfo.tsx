"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
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
}

const CompanyInfo = () => {
  const [info, setInfo] = useState<CompanyState>({
    name: "",
    logo: "",
    teamDetails: "",
    testimonials: "",
    projects: "",
    executiveSummary: "",
    pricing: "",
  });
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/generate-proposal");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ info });
    await axios.post("/api/company", {
      name: info?.name,
      logo: info?.logo,
      teamDetails: info?.teamDetails,
      testimonials: info?.testimonials,
      projects: info?.projects,
      executiveSummary: info?.executiveSummary,
      pricing: info?.pricing,
    });
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
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CompanyInfo;
