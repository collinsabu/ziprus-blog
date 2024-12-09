import BlogPage from '@/components/blogpage';
import Newsletter from '@/components/newletter';
import PopularBlogs from '@/components/PopularBlogs';

import React from 'react'

function Home() {
  return (
    <main>
      <BlogPage/>
      <Newsletter/>
      <PopularBlogs/>
    </main>
  )
}

export default Home