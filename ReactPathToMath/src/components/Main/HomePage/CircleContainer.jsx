import React from 'react';
import SubjectCircle from './SubjectCircle';
import mathCircle from '../../../assets/Images/math_circle.png';
import vidsCircle from '../../../assets/Images/vids_circle.png';
import badgeCircle from '../../../assets/Images/badge_circle.png';
import popquiz_circle from '../../../assets/Images/popquiz_circle.png';
import { Link } from 'react-router-dom';

const circleData = [
  {
    title: 'Math Problems',
    description: 'Solve fun puzzles to improve your skills!',
    imageSrc: mathCircle,
    link: '/math-problems',
  },
  {
    title: 'Tutorial Videos',
    description: 'Watch videos to learn new tricks!',
    imageSrc: vidsCircle,
    link: '/videos',
  },
  {
    title: 'Pop Quiz',
    description: 'Take quick quizzes to test yourself!',
    imageSrc: popquiz_circle,
    link: '/pop-quiz',
  },
  {
    title: 'Badges',
    description: 'Earn badges as you progress!',
    imageSrc: badgeCircle,
    link: '/badges',
  },
];

function CirclesContainer() {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8 w-full h-1/2">
      {circleData.map(({ imageSrc, title, description, link }, index) => (
        <Link to={link} key={index}>
          <SubjectCircle
            imageSrc={imageSrc}
            title={title}
            description={description}
          />
        </Link>
      ))}
    </div>
  );
}

export default CirclesContainer;
