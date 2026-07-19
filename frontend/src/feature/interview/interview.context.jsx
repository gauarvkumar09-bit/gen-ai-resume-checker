import { createContext, useContext, useState } from "react";

// Context create karo
export const InterviewContext = createContext();

// Provider component
export const InterviewProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [report, setreport] = useState(null);
  const [reports, setreports] = useState([]);

  const value = {
    loading,
    setloading,
    report,
    setreport,
    reports,
    setreports,
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
    </InterviewContext.Provider>
  );
};

// Custom hook
export const useInterviewContext = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterviewContext must be used within an InterviewProvider");
  }
  return context;
};
