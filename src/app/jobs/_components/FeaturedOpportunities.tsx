import React from 'react'

export default function FeaturedOpportunities() {
  return (
    <>
            <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Featured Opportunities
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked jobs from top companies
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="job-card bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">G</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">
                      Senior Frontend Developer
                    </h3>
                    <p className="text-gray-600 text-sm">Google</p>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Remote
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                Join our team to build the next generation of web applications
                using React, TypeScript, and modern tools.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  React
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  TypeScript
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Node.js
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                  </svg>
                  <span className="text-sm">San Francisco, CA</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">R150K</span>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                Apply Now
              </button>
            </div>

            <div className="job-card bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">
                      Product Manager
                    </h3>
                    <p className="text-gray-600 text-sm">Spotify</p>
                  </div>
                </div>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Hybrid
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                Lead product strategy and development for our music streaming
                platform used by millions worldwide.
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Strategy
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Analytics
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Leadership
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                  </svg>
                  <span className="text-sm">New York, NY</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">R180K</span>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all">
                Apply Now
              </button>
            </div>

            <div className="job-card bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">N</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">UX Designer</h3>
                    <p className="text-gray-600 text-sm">Netflix</p>
                  </div>
                </div>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Full-time
                </span>
              </div>

              <p className="text-gray-600 mb-4">
                Design intuitive and engaging user experiences for our streaming
                platform across all devices. The best job for creative minds
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  Figma
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  Sketch
                </span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                  Prototyping
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                  </svg>
                  <span className="text-sm">Los Angeles, CA</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">R140K</span>
              </div>

              <button className="w-full mt-4 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
