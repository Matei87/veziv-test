import { Routes, Route } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import ListWork from './components/ListWork';
import Edit from './components/Edit';

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <>
              {/* Form to add a new work */}
              <FormComponent />
              {/* Display showcased works */}
              <ListWork />
            </>
          }
        />

        <Route path='/:id' element={<Edit />} />
      </Routes>
    </div>
  );
};

export default App;
