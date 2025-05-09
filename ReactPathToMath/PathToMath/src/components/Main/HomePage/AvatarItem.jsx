import React from 'react';
import { useLoginStatus } from '../../Utils/LoginStatusComponent';

function AvatarItem({ name }) {
    const { isLoggedIn } = useLoginStatus();  // Use destructuring to get the isLoggedIn value

    return (
        <div className="flex items-center justify-center mt-10 w-full h-full">
            <div className="relative w-full p-4 bg-white rounded-3xl shadow-lg border-2 border-blue-300 text-center">
                <h2 className="text-xl font-semibold mt-2">{name}</h2>
                
                {isLoggedIn ? (
                    <button className="bg-blue-500 text-white py-1 px-4 rounded mt-4">Edit Profile</button>
                ) : (
                    <p className="text-gray-500 mt-4">Please log in to access your profile.</p>
                )}
                </div>
        </div>
    );
}

export default AvatarItem;
