import React, { useState } from 'react';
import  logo from "/favicon2.ico"
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full  border-b">
      <div className="max-w-7xl bg-gray-400 mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Логотип" className="h-8 w-auto" />
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          aria-label="Открыть меню"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Меню</span>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>

        <nav className={`md:flex items-center space-x-6 ${open ? 'block' : 'hidden'}`} aria-label="Основная навигация">
          <a href="/agent" className="block md:inline-block px-2 py-2 text-gray-700 hover:text-gray-900" onClick={() => setOpen(false)}>
            Lojas
          </a>          <a href="/agent/marca" className="block md:inline-block px-2 py-2 text-gray-700 hover:text-gray-900" onClick={() => setOpen(false)}>
            Marcas
          </a>
          <a href="#services" className="block md:inline-block px-2 py-2 text-gray-700 hover:text-gray-900" onClick={() => setOpen(false)}>
            Carros
          </a>
          <a href="#portfolio" className="block md:inline-block px-2 py-2 text-gray-700 hover:text-gray-900" onClick={() => setOpen(false)}>
            Ant
          </a>
          <a href="/agent/about" className="block md:inline-block px-2 py-2 text-gray-700 hover:text-gray-900" onClick={() => setOpen(false)}>
            About
          </a>          <a href="/" className="block md:inline-block px-2 py-2 text-gray-700 hover:text-gray-900" onClick={() => setOpen(false)}>
            Sair
          </a>
        </nav>
      </div>

      {/* Опционально: мобильное меню (для компактности) */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <a href="#home" className="block px-4 py-2 text-gray-700" onClick={() => setOpen(false)}>Главная</a>
          <a href="#services" className="block px-4 py-2 text-gray-700" onClick={() => setOpen(false)}>Услуги</a>
          <a href="#portfolio" className="block px-4 py-2 text-gray-700" onClick={() => setOpen(false)}>Портфолио</a>
          <a href="#contact" className="block px-4 py-2 text-gray-700" onClick={() => setOpen(false)}>Контакты</a>
        </div>
      )}
    </header>
  );
}

// export default {Header};