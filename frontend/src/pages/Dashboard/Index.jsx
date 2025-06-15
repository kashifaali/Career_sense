import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from './Hero'
import Footer from '../../components/Footer'
import Introsection from './Introsection'
import Bottomfooter from '../../components/Bottomfooter'

export default function Index() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Introsection/>
    <Footer/>
    <Bottomfooter/>
    </>
  )
}
