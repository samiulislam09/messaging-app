import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'



function RooteLayout() {
  return (
    <div style={{display:"flex", flexDirection:"row"}}>
        <Sidebar/>
        <Outlet></Outlet>
    </div>
  )
}

export default RooteLayout