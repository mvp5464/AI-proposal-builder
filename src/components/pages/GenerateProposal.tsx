"use client";
import { useState } from "react";
import axios from "axios";
import Loader from "../icons/Loader";
import { ProposalComponent } from "../Proposal";
import { CompanyState } from "./CompanyInfo";

const GenerateProposal = ({
  companyInfo,
  userId,
}: {
  companyInfo: CompanyState;
  userId: string;
}) => {
  const [proposal, setProposal] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [myCompanyInfo, setMyCompanyInfo] = useState<CompanyState>({
    name: companyInfo.name || "",
    logo: companyInfo.logo || "",
    teamDetails: companyInfo.teamDetails || "",
    testimonials: companyInfo.testimonials || "",
    projects: companyInfo.projects || "",
    executiveSummary: companyInfo.executiveSummary || "",
    pricing: companyInfo.pricing || "",
    userId: companyInfo.userId || "",
    email: companyInfo.email || "",
    phone: companyInfo.phone || "",
    website: companyInfo.website || "",
  });

  const getProposal = async () => {
    setLoading(true);
    const res = await axios.post("/api/proposal", {
      company: {
        name: myCompanyInfo.name,
        logo: myCompanyInfo.logo,
        teamDetails: myCompanyInfo.teamDetails,
        testimonials: myCompanyInfo.testimonials,
        projects: myCompanyInfo.projects,
        pricing: myCompanyInfo.pricing,
      },
    });
    setProposal(res.data);
    setMyCompanyInfo({ ...myCompanyInfo, executiveSummary: res.data });
    setLoading(false);
  };

  const getCompanyInfo = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/company");
    if (companyInfo) setMyCompanyInfo(data.message);
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
    <>
      <div className=" w-full h-screen">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Generate Proposal</h1>
          <div className="mb-4 flex gap-5 items-center">
            <div>{myCompanyInfo.name}</div>
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
            </div>
          )}
        </div>
        {proposal && (
          <ProposalComponent
            company={myCompanyInfo}
            userId={userId}
            getCompanyInfo={getCompanyInfo}
          />
        )}
      </div>
    </>
  );
};

export default GenerateProposal;
