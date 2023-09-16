import { Box, Button, FormControl, FormLabel, Input, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@chakra-ui/icons';

export const Order = () => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  const [selCat, setSelCat] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !address || !email || !phone || !order || !status1) {
      toast({
        title: "Please fill all the required fields!",
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
      await axios.post(`/api/order/add`, {
        name, email, address, phone, order, status1
      }, config);
      toast({
        title: "Order successfully placed!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      navigate('/inventory/dashboard');
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

  const handleSearch = async (temp) => {
    setLoading(true);
    setSearch(temp);
    if (!search) {
      setSearchResults();
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
        }
      };
      const { data } = await axios.get('/api/order/all', config);
      setSearchResults(data);
      setLoading(false);
    }
    catch (error) {
      setLoading(false);
      return;
    }
  }

  const selUser = (users) => {
    if (Object.keys(selCat).includes(users)) {
      toast({
        title: "Category has already been added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      return;
    }
    setCategories([users._id, ...categories]);
    setSelCat([users, ...selCat]);
  }

  const delUser = (users) => {
    setSelCat(selCat.filter(temp => temp._id !== users._id));
  }

  return <VStack display='flex' alignItems='center' width='80%' p='10%'>

    <FormControl id='name' isRequired>
      <FormLabel>Product Name</FormLabel>
      <Input
        placeholder='Enter the Product Name'
        type='text'
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter')
            submitHandler();
        }}
      />
    </FormControl>

    <FormControl id='price' isRequired>
      <FormLabel>Price</FormLabel>
      <Input
        placeholder='Enter its Price'
        type='text'
        onChange={(e) => setPrice(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter')
            submitHandler();
        }}
      />
    </FormControl>

    <FormControl id='category' isRequired>
      <FormLabel>Category</FormLabel>
      <Input
        placeholder='Category Search'
        onChange={(e) => handleSearch(e.target.value)}
        px='4'
        mb={3}
      />
    </FormControl>

    <Box display='flex' width='100%' flexWrap='wrap'>
      {selCat?.map(temp => {
        return <Box px={2}
          py={1}
          borderRadius='lg'
          m={1}
          mb={2}
          fontSize={14}
          bgColor='purple'
          color='white'
          display='flex'
          alignItems='center'
          key={temp._id}
        >
          <Text>
            {temp.name}
          </Text>
          <CloseIcon ml='5px' cursor='pointer' onClick={() => delUser(temp)} />
        </Box>
      })}
    </Box>

    <Box width={loading ? 'auto' : '100%'} border='1px solid grey'>
      {
        !loading ? searchResults?.map(users => {
          return <Box cursor='pointer'
            px={3}
            py={2}
            borderRadius='lg'
            key={users._id}
            onClick={() => selUser(users)}
            _hover={{ bgColor: Object.keys(selCat ? selCat : {}).find(temp => temp === users._id) ? 'grey' : 'lightgrey' }}
          >
            <Text display='inline' fontSize='1.3rem'>
              {users.name}
            </Text>
            {' '}
            <Text display='inline' fontSize='0.8rem'>
              {users.email}
            </Text>
          </Box>
        }) : <Spinner thickness='4px'
          speed='0.65s'
          emptyColor='white'
          color='gray'
          size='lg' />
      }
    </Box>

    <FormControl id='quantity' isRequired>
      <FormLabel>Quantity</FormLabel>
      <Input
        placeholder='Enter its Quantity'
        type='text'
        onChange={(e) => setQuantity(e.target.value)}
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
      Add Product
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