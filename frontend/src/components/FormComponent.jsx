import { useContext, useState } from 'react';
import { WorkContext } from '../context/work.context';

const FormComponent = () => {
  const { work, setWork, error, setError } = useContext(WorkContext);
  const [data, setData] = useState({
    title: '',
    description: '',
    image: '',
    customerWebsite: '',
    isVisible: true,
  });

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
      const request = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (request.status === 201) {
        const result = await request.json();
        setWork([...work, result]);
        setData({
          title: '',
          description: '',
          customerWebsite: '',
          isVisible: true,
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <span style={{ color: 'red' }}>{error}</span>
      <h1>Manage Showcased Works</h1>
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
        <button type='submit'>Add Work</button>
      </form>
    </div>
  );
};

export default FormComponent;
