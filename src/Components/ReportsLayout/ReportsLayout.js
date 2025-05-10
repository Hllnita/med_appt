import React, { useEffect, useState } from "react";

const ReportsLayout = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("doctorData");
    if (storedData) {
      try {
        let doctors = JSON.parse(storedData);

        // Normalize to array
        if (!Array.isArray(doctors)) {
          doctors = [doctors];
        }

        const augmentedData = doctors.map((doctor) => {
          const encodedName = encodeURIComponent(doctor.name || "unknown");
          return {
            ...doctor,
            reportUrl: `/reports/view/${encodedName}`,
            downloadUrl: `/reports/download/${encodedName}`,
          };
        });

        setReportData(augmentedData);
      } catch (error) {
        console.error("Failed to parse doctorData from localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="container">
      <h2>Reports</h2>
      {reportData.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Doctor Name</th>
              <th>Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((doctor, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                  <a
                    href={doctor.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Report
                  </a>
                </td>
                <td>
                  <a href={doctor.downloadUrl} download>
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No report data found.</p>
      )}
    </div>
  );
};

export default ReportsLayout;
