import React from 'react';

function ChildProgressCard({ child }) {
  const subjects = ['Addition', 'Subtraction', 'Multiply', 'Division', 'Percentage'];
  const gradeIndex = parseInt(child.grade) - 1;
  const levelData = child.gradeLevel[gradeIndex];

  return (
    <div className="background-image pt-5 rounded-2xl border-4 border-blue-700 p-4 shadow-md flex flex-col items-center text-center mx-auto max-w-[500px] w-full">
      <img
        src={child.avatar}
        alt={`${child.name}'s avatar`}
        className="w-24 h-24 rounded-full object-cover border-2 border-orange-300"
      />
      <h2 className="text-xl font-bold text-orange-600">{child.name}</h2>
      <p className="text-orange-500">Grade {child.grade}</p>

      {/* Subject progress: 2 per row, wrap as needed */}
      <div className="w-full flex flex-wrap justify-center gap-6 mt-3">
        {subjects.map((subject, index) => {
          const completed = levelData?.[subject] ?? 0;
          const total = 20;
          const percentage = Math.round((completed / total) * 100);
          const isCompleted = completed >= total;

          return (
            <div key={index} className="w-[45%] text-left">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{subject}</span>
                <span className="text-sm text-gray-500">{completed}/{total}</span>
              </div>
              {/* Progress Bar */}
              <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${isCompleted ? 'bg-green-500' : 'bg-yellow-400'}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="mt-1 flex justify-end text-lg">
                <span className={isCompleted ? '' : 'opacity-30'}>🏅</span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="mt-3 bg-orange-400 hover:bg-orange-500 text-white px-4 py-1 rounded-full transition cursor-pointer"
        onClick={() => console.log(`View ${child.name}'s full progress`)}
      >
        View Details
      </button>
    </div>
  );
}

export default ChildProgressCard;
