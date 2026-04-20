import { Link } from '@inertiajs/react';
import React from 'react'

interface PostCardProps {
  post: {  // ここを posts に修正
   id: number;
    title: string;
    content: string;
    category: string;
    created_at: string; // DBから届くので created_at になります
  }
}

function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
    <div className="border p-4 rounded-lg shadow-sm">
      <span className="text-blue-500 text-xs">{post.category}</span>
      <h3 className="font-bold">{post.title}</h3>
      <p className="text-gray-400 text-xs">{post.created_at}</p>
    </div>
    </Link>
  )
}

export default PostCard
