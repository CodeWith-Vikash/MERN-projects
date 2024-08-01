import React from 'react'
import AddPost from './AddPost'
import Post from './Post'

const Home = () => {
  return (
    <div className='min-h-screen bg-gray-300 flex flex-col items-center py-8 gap-6'>
      <AddPost/>
      <main>
        <Post/>
      </main>
    </div>
  )
}

export default Home