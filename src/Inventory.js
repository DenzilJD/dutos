import { Box } from '@chakra-ui/react'
import React from 'react'
import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'

export const Inventory = () => {
    return <Box margin={0} height='100vh'>
        <Box display='flex' justifyContent='start'>
            <Sidebar />
            <Outlet />
        </Box>
    </Box>
}