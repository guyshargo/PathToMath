import React from 'react';
import SubjectCircle from './SubjectCircle';
import mathCircle from '../../../assets/Images/math_circle.png';
import vidsCircle from '../../../assets/Images/vids_circle.png';
import badgeCircle from '../../../assets/Images/badge_circle.png';
import popquiz_circle from '../../../assets/Images/popquiz_circle.png';
const circleData = [
  {
    title: 'Math Problems',
    description: 'Solve fun puzzles to improve your skills!',
    imageSrc: mathCircle,
  },
  {
    title: 'Tutorial Videos',
    description: 'Watch videos to learn new tricks!',
    imageSrc: vidsCircle,
  },
  {
    title: 'Pop Quiz',
    description: 'Take quick quizzes to test yourself!',
    imageSrc: popquiz_circle,
  },
  {
    title: 'Badges',
    description: 'Earn badges as you progress!',
    imageSrc: badgeCircle,
  },
];

function CirclesContainer() {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8 w-full h-1/2">
      {circleData.map(({ imageSrc, title, description }, index) => (
        <SubjectCircle
          key={index}
          imageSrc={imageSrc}
          title={title}
          description={description}
        />
      ))}
    </div>
  );
}

export default CirclesContainer;
