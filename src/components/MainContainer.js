import React from 'react'
import Videocontainer from './Videocontainer'
import ButtonList from './ButtonList'
import { useSelector } from 'react-redux';


const MainContainer = () => {
  const themeChanger = useSelector(store=>store.theme.isDark)
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  return (
<div className={isMenuOpen ? `col-span-11 ml-[16.2rem] ${themeChanger ? 'bg-black' : ''}` : 'ml-10'}>
  <div className={isMenuOpen?`${themeChanger?' bg-black':''}col-span-11  ml-3`:"ml-10"}>
  <ButtonList/>
  </div>
      <Videocontainer/>
     
    </div>
  )
}

export default MainContainer
