import React from 'react'
import SideBar from './SideBar'
import MainContainer from './MainContainer'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from './Header'

const Body = () => {
  const themeChanger = useSelector(store=>store.theme.isDark)
  return (
  <>
  <Header/>
    <div className={`flex ${themeChanger?'bg-black':''}`}>
     <div className={`w-64 fixed border border-none overflow-y-hidden ${themeChanger?'bg-black':''} `}>
     <SideBar/>
     </div>
     
     <Outlet/>
     
    </div>
    </>
  )
}

export default Body
