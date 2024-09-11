import { Routes, Route } from 'react-router-dom';
import ExForm from '../containers/ExForm';
import FoodForm from '../containers/FoodForm';
import GraphForm from '../containers/GraphForm';

function PageRoutes() {
  return (
    <Routes>
      <Route path="exercise_log" element={<ExForm />} />
      <Route path="foodupdate" element={<FoodForm />} />
      <Route path="graphpage" element={<GraphForm />} />
    </Routes>
  );
}

export default PageRoutes;
