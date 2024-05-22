import React from 'react'
import NavBar from '../NavBar';
import Heading from '../Heading';
import Content from '../Content';
import Pros from '../Pros';
import Advantages from '../Advantages';
import Footer from '../Footer';
import TableComponent from '../Table';
export default function Home() {
  return (
    <div>
        <NavBar/>
        <Heading/>
        <Content/>
        <Pros/>
        <Advantages/>
        <Footer/>
        {/* <TableComponent /> */}
    </div>
  )
}