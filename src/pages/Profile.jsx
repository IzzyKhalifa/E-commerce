import React, { useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    bio: 'A software developer with 5 years of experience',
    profileImg: 'https://www.example.com/profile.jpg',
  });

  const handleEdit = (newUser) => {
    setUser({ ...user, ...newUser });
  };

  return (
    <div>
      <img src={user.profileImg} alt={user.name} />
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
      <button onClick={() => handleEdit({ name: 'Jane Doe' })}>Edit name</button>
      <button onClick={() => handleEdit({ bio: 'A web developer with 7 years of experience' })}>Edit bio</button>
    </div>
  );
};

export default ProfilePage;