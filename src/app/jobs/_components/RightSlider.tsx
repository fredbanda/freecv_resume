import React from 'react'

export default function RightSlider() {
  return (
    <>
         <div className="slide-in-right">
              <div className="relative">
                <div className="bg-white p-8 rounded-3xl shadow-2xl floating">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800">
                        Application Sent!
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Senior Developer at TechCorp
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Match Score</span>
                      <span className="text-sm font-semibold text-green-600">
                        95%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl floating-delayed">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold text-gray-800">
                        Interview Scheduled
                      </p>
                      <p className="text-xs text-gray-600">Tomorrow 10 AM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
    </>
  )
}
