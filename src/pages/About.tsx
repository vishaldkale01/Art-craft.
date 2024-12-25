import React from 'react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:flex lg:items-center lg:gap-x-12">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Me</h1>
          <div className="prose prose-lg">
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Education</h2>
            <ul className="list-disc pl-5 mb-6">
              <li>Master of Fine Arts, University Name, Year</li>
              <li>Bachelor of Arts, University Name, Year</li>
            </ul>
            <h2 className="text-2xl font-bold mt-8 mb-4">Exhibitions</h2>
            <ul className="list-disc pl-5 mb-6">
              <li>Solo Exhibition, Gallery Name, City, Year</li>
              <li>Group Exhibition, Gallery Name, City, Year</li>
              <li>Art Fair, Event Name, City, Year</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80"
            alt="Artist in studio"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}