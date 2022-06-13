import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coin from './coin';
import Coinsss from './coinsss';
import Chart from './chart';
import Price from './price';

function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:coinId' element = {<Coin/>}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price  />} />
        </Route>
        <Route path ='/' element={<Coinsss/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;


