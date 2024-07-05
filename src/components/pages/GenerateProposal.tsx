"use client";
import { useState } from "react";
import axios from "axios";
import Loader from "../icons/Loader";

interface companyInfo {
  id: string;
  name: string;
  logo: string;
  teamDetails: string;
  testimonials: string;
  projects: string;
  executiveSummary: string;
  pricing: string;
  userId: string;
}

const GenerateProposal = ({ companyInfo }: { companyInfo: companyInfo }) => {
  const [proposal, setProposal] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getProposal = async () => {
    setLoading(true);
    const res = await axios.post("/api/proposal", {
      company: {
        name: companyInfo.name,
        logo: companyInfo.logo,
        teamDetails: companyInfo.teamDetails,
        testimonials: companyInfo.testimonials,
        projects: companyInfo.projects,
        executiveSummary: companyInfo.executiveSummary,
        pricing: companyInfo.pricing,
      },
    });
    setProposal(res.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <>
        <Loader info={"Generating Your AI Proposal"} />
      </>
    );
  }

  return (
    <div className="p-4  bg-slate-200 w-fit h-fit">
      <h1 className="text-xl font-bold mb-4">Generate Proposal</h1>
      <div className="mb-4 flex gap-5 items-center">
        <div>{companyInfo.name}</div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={getProposal}
        >
          Generate
        </button>
      </div>
      {proposal && (
        <div className="mt-4 p-4 border">
          <h2 className="text-lg font-bold">Generated Proposal</h2>
          <pre>{proposal}</pre>
        </div>
      )}
    </div>
  );
};

export default GenerateProposal;
