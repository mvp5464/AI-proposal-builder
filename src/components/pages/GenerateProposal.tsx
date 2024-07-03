"use client";
import { useState } from "react";
import axios from "axios";

const GenerateProposal: React.FC = () => {
  const [companyId, setCompanyId] = useState("");
  const [proposal, setProposal] = useState<any>("");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Generate Proposal</h1>
      <div className="mb-4">
        <label className="block">Company ID</label>
        <input
          type="text"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          className="w-full border p-2"
        />
      </div>
      <button
        onClick={async () => {
          const res = await axios.post("/api/proposal", {
            company: {
              name: "GepziDesiner",
              logo: "www.GepziDesiner.com",
              teamDetails: "1. Mahesh: team Leader\n2. Vijay: desiner",
              testimonials: "1. They are very good desiner and works good",
              projects: "1. www.mydesign.com \n2.www.newvlog.io",
              executiveSummary: "We create website design for all",
              pricing: "1. Basic plan: 400$\n2. Premium plan 800$",
            },
          });
          console.log({ res: res.data });
          setProposal(res.data);
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate
      </button>
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
