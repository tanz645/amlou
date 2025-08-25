'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';

interface OffCanvasMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OffCanvasMenu({ isOpen, onClose }: OffCanvasMenuProps) {
  const menuItems = [
    { name: 'Management', href: '/management' },
    { name: 'Accounting', href: '/accounting' },
    { name: 'Task Manager', href: '/tasks' },
    { name: 'Digital Marketing', href: '/marketing' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Menu */}
      <div 
        className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Quick Access</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}