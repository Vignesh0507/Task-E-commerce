import {  Route, Routes } from 'react-router-dom';
import HomePage from '../Homee/HomePage';
import FetchChildrensClothing from '../config/FetchChildrensClothing ';
import FetchFemaleClothing from '../config/FetchFemaleClothing';
import FetchMaleClothing from '../config/FetchMaleClothing';
import { useParams } from 'react-router-dom';
import FetchAllProducts from '../../Owner/FetchAllProducts';

function RoutePage() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/data/:id" element={<ProductPage />} />
        <Route path="/fetch-all-products" element={<FetchAllProducts />} />
      </Routes>
  );
}

function ProductPage() {
  const { id } = useParams();

  let apiToFetch = null;
  if (id === "1") { 
    apiToFetch = <FetchChildrensClothing />;
  }
  if (id === "2") { 
    apiToFetch = <FetchFemaleClothing />;
  }
  if (id === "3") { 
    apiToFetch = <FetchMaleClothing />;
  }

  return (
    <div>
      
      {apiToFetch} {/* Display the respective API based on the ID */}
    </div>
  );
}

export default RoutePage;
