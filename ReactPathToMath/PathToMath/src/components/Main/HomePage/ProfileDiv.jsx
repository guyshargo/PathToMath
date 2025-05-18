import React from 'react';
import { useLoginStatus } from '../../Utils/LoginStatusComponent';
import ProfileCard from './ProfileCard';
import ChooseGrade from './ChooseGradeComponent';
import profile from "../../../assets/Images/profile.png"; 
function ProfileDiv() {
    const isLoggedIn = useLoginStatus();
    return (
             <div className="flex flex-col md:flex-row gap-6 justify-center items-center w-full max-w-4xl">
            
            {/* Avatar Card */}
            <ProfileCard 
                label={isLoggedIn.isLoggedIn ? "Hello Jordi!" : "Hello Guest!"} 
                icon={profile} 
                buttonLabel={isLoggedIn.isLoggedIn ? "Edit Profile" : "Log In"} 
                buttonColor="bg-blue-400" 
                buttonTextColor="text-white"
                buttonAction={() => console.log(isLoggedIn.isLoggedIn ? "Edit Profile Clicked" : "Log In Clicked")}
            />
            {/* Grade Selector Section */}
                <ChooseGrade />
            
        </div>
    );
}

export default ProfileDiv;
