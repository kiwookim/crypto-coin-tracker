import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Coin from './coin';
import Coinsss from './coinsss';

function Router () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/:coinId' element = {<Coin/>}>
        </Route>
        <Route path ='/' element={<Coinsss/>}>
        </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default Router;


