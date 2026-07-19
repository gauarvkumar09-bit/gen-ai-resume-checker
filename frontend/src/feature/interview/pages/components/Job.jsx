import React, { useState, useRef } from "react";
import { useInterview } from "../../../interview/hooks/useInterview";
import { useNavigate } from "react-router";

const Job = () => {
  const { loading, generateReport } = useInterview();

  const [jobdescription, setJobdescription] = useState("");
  const [selfdescription, setSelfdescription] = useState("");
  const [resumeName, setResumeName] = useState(""); // ✅ filename state
  const ResumeInputRef = useRef();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name); // ✅ show filename
    }
  };

  const handlegenerateReport = async () => {
    const resumeFile = ResumeInputRef.current.files[0];
    if (!resumeFile) {
      alert("Please upload a resume file first!");
      return;
    }

    const data = await generateReport({
      jobdescription,
      selfdescription,
      resume: resumeFile,
    });
     console.log("Interview Report:", data.interviewReport);
    if (data && data._id) {
      navigate(`/interview/${data._id}`);
    } else {
      console.error("Invalid response:", data);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-amber-50 p-6 rounded shadow-md flex flex-col gap-6">
        {/* Resume Upload */}
        <div className="flex flex-col">
          <h1 className="font-semibold mb-2">Resume</h1>
          <label
            htmlFor="resume"
            className="cursor-pointer bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-700 w-fit"
          >
            Upload Resume
          </label>
          <input
            ref={ResumeInputRef}
            id="resume"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {resumeName && (
            <p className="text-green-600 mt-2">✅ File selected: {resumeName}</p>
          )}
        </div>

        {/* Self Description */}
        <div className="flex flex-col">
          <h1 className="font-semibold mb-2">Self Description</h1>
          <textarea
            onChange={(e) => setSelfdescription(e.target.value)}
            className="border border-gray-300 rounded p-2"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        {/* Job Description */}
        <div className="flex flex-col">
          <h1 className="font-semibold mb-2">Job Description</h1>
          <textarea
            onChange={(e) => setJobdescription(e.target.value)}
            className="border border-gray-300 rounded p-2"
            placeholder="Enter job description..."
          ></textarea>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={handlegenerateReport}
          disabled={loading}
          className="bg-green-600 px-6 py-2 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Click here to generate"}
        </button>
      </div>
    </div>
  );
};

export default Job;
