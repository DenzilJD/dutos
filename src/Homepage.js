import { Box, Container, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Login } from './Authentication/Login';
import { Signup } from './Authentication/Signup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Homepage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user)
            navigate('/inventory');
    }, [navigate]);

    return <Box bgColor='blue.600'>
        <Container
        centerContent
        h='100vh'
        justifyContent='center'
        >
        <Text color='white' fontSize='5xl'>
            Inventory
        </Text>
        <Box width='100%' height='80%' borderRadius='21px' bgColor='whitesmoke' p='5px'>
            <Tabs variant='soft-rounded' colorScheme='blue'>
                <TabList mb='1em'>
                    <Tab width='50%'>Login</Tab>
                    <Tab width='50%'>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel><Login /></TabPanel>
                    <TabPanel><Signup /></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>
        </Box>
}