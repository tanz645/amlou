'use client';

import React from 'react';

// The sidebar has been moved to its own component: /components/ChessSidebar.tsx
// and is now rendered in the layout: /app/chess/layout.tsx

const ChessPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chess Dashboard</h1>
      <p>Welcome to the main dashboard for the Chess application.</p>
      {/* The main content for the chess dashboard will go here. */}
    </div>
  );
};

export default ChessPage; 