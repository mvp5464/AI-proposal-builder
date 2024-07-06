"use client";
import axios from "axios";
import React, { useState } from "react";
import { CompanyState } from "./pages/CompanyInfo";

export const ProposalComponent = ({
  company,
  userId,
  getCompanyInfo,
}: {
  company: CompanyState;
  userId: string;
  getCompanyInfo: () => Promise<void>;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [info, setInfo] = useState<CompanyState>({
    name: company.name,
    logo: company.logo,
    teamDetails: company.teamDetails,
    testimonials: company.testimonials,
    projects: company.projects,
    executiveSummary: company.executiveSummary,
    pricing: company.pricing,
    userId: company.userId,
    email: company.email,
    phone: company.phone,
    website: company.website,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEdit) {
      return setIsEdit((p) => !p);
    }
    setLoading(true);
    try {
      await axios.put("/api/company", {
        name: info?.name,
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

      getCompanyInfo();
      setLoading(false);
      setIsEdit(false);
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" w-full h-fit bg-blue-200 overflow-hidden">
        <div className=" flex justify-center items-center gap-3">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : isEdit ? "Done" : "Edit"}
          </button>
          {isEdit && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          )}
        </div>
        <div className="w-full my-4 relative">
          <div className="flex justify-center ">
            <img
              src={"/template.png"}
              alt=""
              className="w-full max-w-screen-md"
            />
            <div className="absolute left-[18rem] top-2 bg-fuchsia-400s">
              <img
                src={info?.logo}
                alt={`${info?.name} Logo`}
                className="w-32 h-20"
              />
            </div>
            <div className="absolute font-extrabold text-3xl top-8 bg-fuchsia-400s">
              {!isEdit ? (
                <span>{info?.name}</span>
              ) : (
                <div className="text-center">
                  <input
                    className=" text-center bg-zinc-100 w-[90%]"
                    type="text"
                    value={info?.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                  />
                </div>
              )}
            </div>
            <div className="absolute left-[19rem] font-bold right-[18rem] top-[10rem] bg-fuchsia-400s">
              {!isEdit ? (
                <span>{info?.executiveSummary}</span>
              ) : (
                <div>
                  <textarea
                    rows={6}
                    className="w-full bg-zinc-100"
                    value={info?.executiveSummary}
                    onChange={(e) =>
                      setInfo({ ...info, executiveSummary: e.target.value })
                    }
                  />
                </div>
              )}
            </div>
            <div className="absolute left-[19rem] font-bold right-[18rem] top-[23rem] bg-fuchsia-400s">
              {!isEdit ? (
                <span>{info?.projects}</span>
              ) : (
                <textarea
                  rows={6}
                  className="w-full bg-zinc-100"
                  value={info?.projects}
                  onChange={(e) =>
                    setInfo({ ...info, projects: e.target.value })
                  }
                />
              )}
            </div>
            <div className="absolute left-[19rem] font-bold right-[18rem] top-[36rem] bg-fuchsia-400s">
              {!isEdit ? (
                <span>{info?.testimonials}</span>
              ) : (
                <textarea
                  rows={6}
                  className="w-full bg-zinc-100"
                  value={info?.testimonials}
                  onChange={(e) =>
                    setInfo({ ...info, testimonials: e.target.value })
                  }
                />
              )}
            </div>
            <div className="absolute left-[19rem] font-bold right-[18rem] top-[48rem] bg-fuchsia-400s">
              {!isEdit ? (
                <span>{info?.pricing}</span>
              ) : (
                <textarea
                  rows={5}
                  className="w-[40%] bg-zinc-100"
                  value={info?.pricing}
                  onChange={(e) =>
                    setInfo({ ...info, pricing: e.target.value })
                  }
                />
              )}
            </div>
            <div className="absolute left-[40rem] font-bold right-[18rem] top-[48rem] bg-fuchsia-400s">
              {!isEdit ? (
                <span>{info?.teamDetails}</span>
              ) : (
                <textarea
                  rows={5}
                  className="w-full bg-zinc-100"
                  value={info?.teamDetails}
                  onChange={(e) =>
                    setInfo({ ...info, teamDetails: e.target.value })
                  }
                />
              )}
            </div>
            <div className="absolute left-[19rem] font-bold right-[18rem] bottom-[8.5rem] bg-fuchsia-400s">
              We invite you to schedule a free consultation to discuss your
              project requirements and how {info.name} can help you build it.
            </div>
            <div className="absolute flex flex-col left-[19rem] font-bold right-[18rem] bottom-[0rem] bg-fuchsia-400s">
              <div>
                <span>Email:</span>{" "}
                {!isEdit ? (
                  <span>{info?.email}</span>
                ) : (
                  <input
                    className="bg-zinc-100"
                    type="text"
                    value={info?.email}
                    onChange={(e) =>
                      setInfo({ ...info, email: e.target.value })
                    }
                  />
                )}
              </div>
              <div>
                <span>Phone:</span>{" "}
                {!isEdit ? (
                  <span>{info?.phone}</span>
                ) : (
                  <input
                    className="bg-zinc-100"
                    type="text"
                    value={info?.phone}
                    onChange={(e) =>
                      setInfo({ ...info, phone: e.target.value })
                    }
                  />
                )}
              </div>
              <div>
                <span>Website:</span>{" "}
                {!isEdit ? (
                  <span>{info.website}</span>
                ) : (
                  <input
                    className="bg-zinc-100"
                    type="text"
                    value={info?.website}
                    onChange={(e) =>
                      setInfo({ ...info, website: e.target.value })
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
