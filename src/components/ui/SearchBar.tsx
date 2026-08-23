'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Future search implementation
      console.log('Searching for:', query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center w-full h-14 rounded-full border bg-background shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-primary focus-within:border-primary overflow-hidden">
        <div className="grid place-items-center h-full w-14 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none text-base bg-transparent pr-4"
          type="text"
          id="search"
          placeholder="Hangi aracı arıyorsunuz? (Örn: İndirim hesaplama)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <button 
          type="submit" 
          className="h-10 px-6 mr-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors hidden sm:block"
        >
          Bul
        </button>
      </div>
    </form>
  );
}
