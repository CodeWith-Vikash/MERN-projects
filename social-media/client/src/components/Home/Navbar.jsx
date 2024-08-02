import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center px-4 py-2 bg-white md:sticky md:top-0 z-50'>
      <Link to='/'>
      <img src="/logo.png" className='h-14'/>
      </Link>
      <div className='flex items-center gap-4'>
        <Link to='/login'>
          <button className='bg-green-600 text-white font-semibold px-2 py-1 rounded'>Login</button>
        </Link>
        <Link to='/dash'>
           <img src="https://scontent.fpat2-3.fna.fbcdn.net/v/t39.30808-1/441536166_437807788855507_2768361419187942287_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=1&ccb=1-7&_nc_sid=f4b9fd&_nc_ohc=TqgV9mSr2DgQ7kNvgEzDVNf&_nc_ht=scontent.fpat2-3.fna&gid=AZ5NgVnF6qopzwe2B-tba1a&oh=00_AYBht9XU0V9AlC1YqMAHvWIe4D1UOR2ApkHSfnMkPB-EGA&oe=66B0E3F2" className='h-10 w-10 rounded-full'/>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar