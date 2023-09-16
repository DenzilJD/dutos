import { Box, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate();
    return <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='1vh'
        height='8vh'
    >
        <Link to='/inventory/dashboard'>
            <Text fontSize='2xl'>
                Inventory
            </Text>
        </Link>
        <Box color='red'
            fontWeight={500}
            borderRadius='1000px'
            padding='5px'
            _hover={{ cursor: 'pointer' }}
            onClick={() => {
                localStorage.removeItem("userInfo");
                navigate('/');
            }}>
            <Text>Log Out</Text>
        </Box>
    </Box >
}
