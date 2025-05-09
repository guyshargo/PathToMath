import React from 'react';
import ProfileDiv from '../HomePage/ProfileDiv'
import placeHolderAvatar from '../../../assets/Images/Avatars/avatar1.png';
import CirclesContainer from './CircleContainer';

function HomePage() {
    return (
        <div className="flex-grow w-full h-full flex ">
            <div className="hidden lg:flex w-1/3 h-full p-4 items-end "> 
                <img 
                    src={placeHolderAvatar} 
                    alt="Avatar" 
                    className="object-contain h-full"
                />
            </div>

            {/* Main Content Section */}
            <div className="flex flex-col items-center justify-start gap-4 w-full lg:w-2/3 h-full ">
                <ProfileDiv />
                <CirclesContainer />
            </div>
        </div>
    );
}
export default HomePage;