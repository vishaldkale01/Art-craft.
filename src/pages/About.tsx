import React, { useEffect } from 'react';
import { useAbout } from '../hooks/useAbout';

export default function About() {
  const { aboutText, education, exhibitions, imageUrl, fetchAbout } = useAbout();
  useEffect(() => {
    fetchAbout();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:flex lg:items-center lg:gap-x-12">
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Me</h1>
          <div className="prose prose-lg">
            <p className="mb-4">{aboutText}</p>
            <h2 className="text-2xl font-bold mt-8 mb-4">Education</h2>
            <ul className="list-disc pl-5 mb-6">
              {education.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <h2 className="text-2xl font-bold mt-8 mb-4">Exhibitions</h2>
            <ul className="list-disc pl-5 mb-6">
              {exhibitions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2">
          <img
            src={imageUrl}
            alt="Artist in studio"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}