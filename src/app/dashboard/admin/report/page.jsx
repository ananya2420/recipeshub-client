"use client";
import { useEffect, useState } from 'react';

export default function RecipeReportsPage() {
    const [reports, setReports] = useState([]);

   // Change your fetch calls to use the full backend URL
const fetchReports = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/reports');
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();

         console.log("report", data);
        setReports(data);
    } catch (error) {
        console.error("Fetch error:", error);
    }
};

const handleRemove = async (recipeId, reportId) => {
    await fetch(`http://localhost:5000/api/admin/remove-recipe/${recipeId}/${reportId}`, { 
        method: 'DELETE' 
    });
    
};
fetchReports();

const handleDismiss = async (reportId) => {
    await fetch(`http://localhost:5000/api/admin/dismiss-report/${reportId}`, { 
        method: 'PATCH' 
    });
    
};




    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-2">Recipe Reports 🚨</h1>
            <p className="text-gray-500 mb-6">{reports.length} pending reports</p>
            
            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                <button className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">Pending</button>
                <button className="text-gray-500">Dismissed</button>
                <button className="text-gray-500">All</button>
            </div>

            <table className="w-full text-left">
                <thead className="text-gray-500 text-sm border-b">
                    <tr>
                        <th className="p-4">Recipe ID</th>
                        <th className="p-4">Reporter</th>
                        <th className="p-4">Reason</th>
                        <th className="p-4">Description</th>
                        <th className="p-4">Reported</th>
                        <th className="p-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report._id} className="border-b hover:bg-gray-50">
                            <td className="p-4 text-gray-600">{report.recipeId.slice(0, 10)}...</td>
                            <td className="p-4">{report.reporterEmail}</td>
                            <td className="p-4">
                                <span className="bg-red-50 text-red-500 px-2 py-1 rounded-full text-xs font-medium border border-red-100">
                                    {report.reason}
                                </span>
                            </td>
                            <td className="p-4 text-gray-500">{report.description || '—'}</td>
                            <td className="p-4 text-gray-500">{report.reportedAt}</td>
                            <td className="p-4 flex gap-2">
                                <button onClick={() => handleRemove(report.recipeId, report._id)} className="bg-red-50 text-red-500 px-3 py-1 rounded text-sm font-medium">Remove Recipe</button>
                                <button onClick={() => handleDismiss(report._id)} className="bg-gray-100 px-3 py-1 rounded text-sm font-medium">Dismiss</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}