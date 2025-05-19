import { Box, Typography } from '@mui/material'
import React from 'react'

function Footer() {
  return (
    <div>
        <Box sx={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center"}}  component={"div"}>

            <Typography variant='h3'>
                School Management System
            </Typography>
            <Typography variant='p'>
                Copyright@2025
            </Typography>
        </Box>
    </div>
  )
}

export default Footer