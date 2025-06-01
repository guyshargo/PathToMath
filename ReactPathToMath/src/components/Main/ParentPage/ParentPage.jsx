import React from 'react';
import ChildProgressCard from './ChildProgressCard';
import {useUser} from '../../Utils/UserContext';



function ParentPage() {
  const { user } = useUser();
  return (
    <div className="w-full h-full playful-font">
      {/* Main content container */}
      <div className="flex flex-col items-center justify-start gap-6 w-full py-10 px-4">
        {/* Rectangle with child progress cards */}
        <div className="w-full max-w-6xl bg-white p-8 rounded-3xl shadow-xl bg-opacity-90">
          {/* Title Section inside the rectangle */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">
              <span className="relative inline-block py-2 px-6 rounded-full bg-orange-300 font-light shadow-md">
                Student Progress Overview
              </span>
            </h2>
            <p className="text-md text-gray-700 max-w-xl mx-auto mt-2">
              View your children’s achievements, solved puzzles, and badges earned in their math learning journey!
            </p>
          </div>

          {/* Flex container for child cards */}
          <div className="flex flex-wrap justify-center gap-6">
              <ChildProgressCard key={user.id} child={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentPage;
