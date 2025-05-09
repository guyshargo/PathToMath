import React from 'react';
import { useLoginStatus } from '../../Utils/LoginStatusComponent';
import AvatarItem from './avatarItem';
function ProfileDiv() {
  const isLoggedIn = useLoginStatus();

  return (
    <>
      <div className="flex items-center justify-center w-full h-3/4">
        <div className="mb-8 w-3/4 h-30 text-center">
          {isLoggedIn==true ? (
            <AvatarItem name="Jordi" />
          ) : (
            <AvatarItem  name="Guest" />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileDiv;