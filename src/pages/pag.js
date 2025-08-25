import React from 'react';

const DocumentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pl-64 pt-16">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Documents</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">No documents available.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentPage;
