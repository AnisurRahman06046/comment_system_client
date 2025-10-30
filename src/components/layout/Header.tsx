import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/helpers';

const Header = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const initials = getInitials(user.firstName, user.lastName);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Comment System
            </h1>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-4">
            {/* User Avatar */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {initials}
                </div>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <svg
                className="mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
