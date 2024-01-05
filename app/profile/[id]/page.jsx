'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@/components/Profile';
const ProfilePage = ({ params }) => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <Profile
      name={posts[0]?.creator?.username}
      desc={`Добро пожаловать на страницу профиля: ${posts[0]?.creator?.username}.`}
      data={posts}
    />
  );
};

export default ProfilePage;
