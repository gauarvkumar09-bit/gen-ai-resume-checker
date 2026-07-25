import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:3000', // ✅ backend port confirm karo
    withCredentials: true             // ✅ cookies/session ke liye
});

// Function to generate interview report
export const generateInterviewReport = async ({ resume, selfdescription, jobdescription }) => {
    try {
        // Prepare form data for file upload + text fields
        const formData = new FormData();
        formData.append("resume", resume); // field name matches backend upload.single("resume")
              
        formData.append('selfdescription', selfdescription); // ✅ text field
        formData.append('jobdescription', jobdescription);   // ✅ text field

        // ✅ Correct backend route: /api/interview (NOT /generate)
        const response = await api.post('/api/interview', formData, {
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
        });

        // Return backend response JSON
        return response.data;

    } catch (err) {
        console.log("Error in generateInterviewReport:", err);
        throw err; // rethrow so hook can handle
    }
};

// Function to get interview report by ID
export const getinterviewreportbyid = async (interviewid) => {
    // console.log("Raw interviewid passed in:", interviewid)
    try {
        
        const response = await api.get(`/api/interview/${interviewid}`);  
        return response.data;
    } catch (err) {
        console.log("Error in getinterviewreportbyid:", err);
        throw err;
    }    
};

export const getAllInterviewReports = async () => {
    try {
        const response = await api.get('/api/interview/reports');
        return response.data;
    } catch (err) {
        console.log("Error in getAllInterviewReports:", err);
        throw err;
    }
};

// export const getinterviewreport = async ()=>{
//     try {
//         const response = await api.get('/api/interview/reports');
//         return response.data;
//     } catch (err) {
//         console.log("Error in getinterviewreportby:", err);
//         throw err;
//     }
// }
