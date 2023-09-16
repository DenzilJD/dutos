import { Button, FormControl, FormLabel, Input, Spinner, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';

export const AddCategory = () => {
    const [name, setName] = useState();
    const [loading, setLoading] = useState();
    const toast = useToast();

    const submitHandler = async () => {
        setLoading(true);
        if (!name) {
            toast({
                title: "Please type in the name of the category to be added!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
                }
            };
            await axios.post(`/api/product/add-category`, {
                name
            }, config);
            toast({
                title: "Category successfully added!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        }
        catch (error) {
            toast({
                title: "Error!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        }
        setLoading(false);
    }

    return <VStack display='flex' alignItems='center' width='80%' p='10%'>
        <FormControl id='name' isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
                placeholder='Enter the Category Name'
                type='text'
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter')
                        submitHandler();
                }}
            />
        </FormControl>

        <Button
            colorScheme='cyan'
            color='white'
            width={'100%'}
            style={{ marginTop: 15 }}
            onClick={submitHandler}
        >
            Add Category
        </Button>
        {loading ? <Spinner
            size='xl'
            w={20}
            h={20}
            alignSelf='center'
            mb='30vh'
        /> : ''}
    </VStack>
}