import React from 'react'
import Footer from '../components/Footer'

const Layout = (prop) => {
  return (
    <div className='bg-slate-800 text-slate-300 h-full w-full'>
      {prop.children}
      <Footer />
    </div>
  )
}

export default Layout