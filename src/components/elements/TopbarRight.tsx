import { BellIcon, Bars3Icon, ChevronDownIcon } from '@heroicons/react/24/outline';
import OffCanvasMenu from '../OffCanvasMenu';

export default function TopbarRight({ isUserMenuOpen, setIsUserMenuOpen, isOffCanvasOpen, setIsOffCanvasOpen, handleLogout }: {
  isUserMenuOpen: boolean,
  setIsUserMenuOpen: (open: boolean) => void,
  isOffCanvasOpen: boolean,
  setIsOffCanvasOpen: (open: boolean) => void,
  handleLogout: () => void,
}) {
  return (
    <div className="flex items-center space-x-2">
      {/* Notifications */}
      <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors relative">
        <BellIcon className="h-4 w-4" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      {/* Off Canvas Menu */}
      <button 
        onClick={() => setIsOffCanvasOpen(true)}
        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
      >
        <Bars3Icon className="h-4 w-4" />
      </button>
      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center space-x-2 p-1.5 hover:bg-gray-100 rounded-md transition-colors focus:outline-none"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <span className="text-white font-medium text-xs">SW</span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-gray-900">Shane Wazal</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <ChevronDownIcon className="w-3 h-3 text-gray-500" />
        </button>
        {isUserMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Shane Wazal</p>
              <p className="text-xs text-gray-500">shane@alhisab.com</p>
            </div>
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Your Profile
            </a>
            <a
              href="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Settings
            </a>
            <div className="border-t border-gray-100 mt-1">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
      <OffCanvasMenu isOpen={isOffCanvasOpen} onClose={() => setIsOffCanvasOpen(false)} />
    </div>
  );
} 