

import React from 'react';

type NavItem = { label: string; href: string };

type HeaderProps = {
  title?: string;
  navItems: NavItem[];
};

export const Header2: React.FC<HeaderProps> = ({ title = 'Мой сайт', navItems }) => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-gray-800">{title}</span>
        </div>
        <nav aria-label="Навигация" className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-gray-600 hover:text-gray-900">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

// export default Header2;