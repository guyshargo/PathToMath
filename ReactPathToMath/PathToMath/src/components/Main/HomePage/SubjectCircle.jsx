import React from 'react';

function SubjectCircle({ imageSrc, title, description }) {
  return (
    <div className="flex flex-col items-center text-center w-44 transform transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
      <div className="w-36 h-36 rounded-full overflow-hidden shadow-md border-4 border-white">
        <img
          src={imageSrc}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-3">
        <div className="font-bold text-lg">{title}</div>
        <div className="text-sm text-gray-600 mt-1">{description}</div>
      </div>
    </div>
  );
}

export default SubjectCircle;
