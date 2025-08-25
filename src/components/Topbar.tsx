'use client';

import { useState } from 'react';
import TopMenu from './elements/TopMenu';
import TopbarLeft from './elements/TopbarLeft';
import TopbarRight from './elements/TopbarRight';

export default function Topbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [isAlhisabMenuOpen, setIsAlhisabMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <>
      <div className="nt-component nt-top-menu bg-white/95 backdrop-blur-sm border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="flex justify-between items-center h-12 px-4">
          <TopbarLeft isAlhisabMenuOpen={isAlhisabMenuOpen} setIsAlhisabMenuOpen={setIsAlhisabMenuOpen} />
          <div className="flex-1 flex justify-center">
            <TopMenu />
          </div>
          <TopbarRight
            isUserMenuOpen={isUserMenuOpen}
            setIsUserMenuOpen={setIsUserMenuOpen}
            isOffCanvasOpen={isOffCanvasOpen}
            setIsOffCanvasOpen={setIsOffCanvasOpen}
            handleLogout={handleLogout}
          />
        </div>
      </div>
      {/* Click outside to close dropdowns */}
      {(isUserMenuOpen || isAlhisabMenuOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsAlhisabMenuOpen(false);
          }}
        />
      )}
    </>
  );
} 