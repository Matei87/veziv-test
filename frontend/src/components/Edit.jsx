import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WorkContext } from '../context/work.context';

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { work, setWork, setError } = useContext(WorkContext);
  const [data, setData] = useState({});

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value, files, checked } = e.target;
    if (name === 'isVisible') {
      setData({
        ...data,
        [name]: checked,
      });
    } else if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setData({
          ...data,
          [name]: reader.result,
        });
      };
    } else {
      setData({ ...data, [name]: value });
    }
  };

  //Form handler for submit
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const request = await fetch(
        `http://localhost:3000/api${location.pathname}`,
        {
          method: 'PUT',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (request.status === 200 || request.status === 204) {
        const result = await request.json();
        const currentWork = work.findIndex(
          ({ _id }) => _id === location.pathname.slice(1)
        );
        work[currentWork] = { ...data };
        console.log('EDITAT1 ', work[currentWork], data, work, result);
        setWork(work);
        setData({});
        navigate('/');
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const request = await fetch(
          `http://localhost:3000/api${location.pathname}`
        );
        if (request.status === 200) {
          const result = await request.json();
          setData(result);
        }
      } catch (error) {
        setError(error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <h1>Edit Showcased Works</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type='text'
          placeholder='Title'
          name='title'
          value={data.title}
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Description'
          name='description'
          value={data.description}
          onChange={handleInputChange}
        />
        <input
          type='file'
          accept='image/png, image/jpeg'
          name='image'
          onChange={handleInputChange}
        />
        <input
          type='url'
          placeholder='http://www.example.com'
          name='customerWebsite'
          value={data.customerWebsite}
          onChange={handleInputChange}
        />
        <label>
          Visible:
          <input
            type='checkbox'
            checked={data.isVisible}
            name='isVisible'
            onChange={handleInputChange}
          />
        </label>
        <button type='submit'>Edit</button>
        <button type='submit' onClick={() => navigate('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Edit;
