import { Box, Button, FormControl, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

export const Dashboard = () => {
  const toast = useToast();
  const [totalValue, setTotalValue] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [res, setRes] = useState();
  const [quant, setQuant] = useState();
  const [change, setChange] = useState(false);

  useEffect(() => {
    const allProducts = async () => {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("userInfo")).token}`
          }
        };
        const { data } = await axios.get('/api/product/all', config);
        let t1 = 0, t2 = 0, t3 = 0, size = 0;
        if (data)
          size = Object.keys(data).length;
        for (let i = 0; i < size; i++) {
          if (data[i].quantity === '0')
            t3++;
          t1 = t1 + Number(data[i].quantity);
          t2 = t2 + Number(data[i].price) * Number(data[i].quantity);
        }
        console.log(data);
        setRes(data);
        setTotalItems(t1);
        setTotalValue(t2);
        setOutOfStock(t3);
      }
      catch (error) {
        toast({
          title: "Error!",
          description: error.message + '. Try refreshing the page.',
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
      }
    }
    allProducts();
  }, [change, toast]);

  const deliver = async (quantity, id) => {
    if (quantity < quant) {
      toast({
        title: "Not enough supply!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
        }
      };
      await axios.post(`/api/product/update`, { _id: id, quantity: Number(quant) - Number(quantity) }, config);
      toast({
        title: "Updated Inventory, successfully!",
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
  }
  const add = async (quantity, id) => {
    console.log(quantity);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
        }
      };
      await axios.post(`/api/product/update`, { _id: id, quantity: Number(quant) + Number(quantity) }, config);
      toast({
        title: "Updated Inventory, successfully!",
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
  }

  return <Box>
    {res && <Box display='flex' justifyContent='space-evenly' w='80vw' marginTop='20px' fontSize='1.4rem' color='white'>
      <Box bgColor='yellow.400' borderRadius='1000px' padding='5px 10px'>Total Items: {totalItems}</Box>
      <Box bgColor='green.400' borderRadius='1000px' padding='5px 10px'>Total Value: ₹{totalValue}/-</Box>
      <Box bgColor='red.400' borderRadius='1000px' padding='5px 10px'>Out of Stock: {outOfStock}</Box>
    </Box>}
    {res && <Box marginTop='10%'><Box display='flex' justifyContent='space-evenly'>
      <Box paddingLeft='20px' w='16vw'><b>Product</b></Box>
      <Box paddingLeft='20px' w='16vw'><b>Price (₹)</b></Box>
      <Box paddingLeft='20px' w='16vw'><b>Quantity</b></Box>
      <Box paddingLeft='20px' w='16vw'><b>Total Amount (₹)</b></Box>
      <Box paddingLeft='20px' w='16vw'><b>Actions</b></Box>
    </Box>
      {Object.values(res).map(temp => {
        return <Box display='flex' key={temp._id} justifyContent='space-evenly'>
          <Box paddingLeft='20px' w='16vw'>{temp.name}</Box>
          <Box paddingLeft='20px' w='16vw'>{temp.price}</Box>
          <Box paddingLeft='20px' w='16vw'>{temp.quantity}</Box>
          <Box paddingLeft='20px' w='16vw'>{temp.price * temp.quantity}</Box>
          <Box paddingLeft='20px' w='16vw' display='flex'>
            <Button onClick={() => {
              deliver(temp.quantity, temp._id);
              setChange(!change);
            }}>
              <MinusIcon />
            </Button>
            <FormControl id='quant' isRequired>
              <Input
                placeholder='Quantity'
                type='text'
                onChange={(e) => setQuant(Number(e.target.value))}
              />
            </FormControl>
            <Button onClick={() => {
              add(temp.quantity, temp._id);
              setChange(!change);
            }
            }>
              <AddIcon />
            </Button>
          </Box>
        </Box>
      })}
    </Box>
    }
  </Box >
}