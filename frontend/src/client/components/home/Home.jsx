import React from 'react'
import Gallery from './gallery/Gallery'
import { Box } from '@mui/material'
import SchoolCarousel from './carousel/SchoolCarousel'

function Home() {
  return (
    <Box>
      <SchoolCarousel />
      <Gallery/>
    </Box>
  
  )
}

export default Home