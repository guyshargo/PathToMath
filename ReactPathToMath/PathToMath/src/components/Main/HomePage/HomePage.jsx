import React from 'react';
import ProfileDiv from '../HomePage/ProfileDiv';
import placeHolderAvatar from '../../../assets/Images/Avatars/avatar1.png';
import CirclesContainer from './CircleContainer';

function HomePage() {
    return (
        <div className="flex-grow w-full mb-4 h-full flex flex-row justify-center items-center">
            {/* Avatar container with adjusted positioning */}
            <div className="hidden lg:flex w-1/3 h-full justify-end items-center relative">
                <div className="flex w-full h-full items-center justify-end relative">
                    <img 
                        src={placeHolderAvatar} 
                        alt="Avatar" 
                        className="object-contain max-h-92 w-auto translate-y-4 -mr-6"
                    />
                </div>
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col items-center justify-start gap-4 w-full lg:w-2/3 h-full">
                <ProfileDiv />
                <CirclesContainer />
            </div>
        </div>
    );
}

export default HomePage;