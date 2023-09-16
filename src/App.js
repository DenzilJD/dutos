import { Route, Routes } from 'react-router-dom';
import { Homepage } from './Homepage';
import { Box } from '@chakra-ui/react';
import { Inventory } from './Inventory';
import { Dashboard } from './Dashboard';
import { AddCategory } from './AddCategory';
import { AddProduct } from './AddProduct';

function App() {
  return <Box h='100vh'>
    <Routes>
      <Route
        path='/inventory'
        element={<Inventory />}
      >
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='product' element={<AddProduct />} />
        <Route path='category' element={<AddCategory />} />
      </Route>
      <Route
        path='/'
        element={<Homepage />}
      />
    </Routes>
  </Box>
}

export default App;
