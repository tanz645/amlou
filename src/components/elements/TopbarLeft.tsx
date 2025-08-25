import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDownIcon, HomeIcon, CircleStackIcon, UserGroupIcon, BeakerIcon } from '@heroicons/react/24/outline';

const navigation = {
  main: [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Al-Hisab', href: '/al-hisab', icon: CircleStackIcon },
    { name: 'Chess', href: '/chess', icon: BeakerIcon },
  ],
};

const subNavigation = {
  main: [
    { name: 'Dashboard', href: '/business', icon: HomeIcon },
  ],
};

export default function TopbarLeft({ isAlhisabMenuOpen, setIsAlhisabMenuOpen }: { isAlhisabMenuOpen: boolean, setIsAlhisabMenuOpen: (open: boolean) => void }) {
  const pathname = usePathname() || '';
  return (
    <div className="flex items-center space-x-4">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <span className="text-lg font-bold text-gray-900 hidden sm:block">Alhisab</span>
      </Link>
      {/* Alhisab Menu Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsAlhisabMenuOpen(!isAlhisabMenuOpen)}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          <span>Menu</span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${isAlhisabMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        {isAlhisabMenuOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {navigation.main.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div key={group.name} className="px-3 py-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    <GroupIcon className="w-3 h-3" />
                    <span>{group.name}</span>
                  </div>
                  <div className="space-y-1">
                    {subNavigation.main.map((item) => {
                      const ItemIcon = item.icon;
                      const isActive = pathname.startsWith(item.href);
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center space-x-2 px-2 py-1.5 text-sm rounded-md transition-colors ${
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                          onClick={() => setIsAlhisabMenuOpen(false)}
                        >
                          <ItemIcon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 