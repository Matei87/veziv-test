import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { WorkContext } from '../context/work.context';

const ListWork = () => {
  const { work, setWork, setError } = useContext(WorkContext);
  const [isvisible, setIsvisible] = useState(true);

  const handleDeleteWork = async (id) => {
    try {
      const request = await fetch(`http://localhost:3000/api/${id}`, {
        method: 'DELETE',
      });
      if (request.status === 200) {
        const updatedWork = work.filter((work) => work._id !== id);
        setWork(updatedWork);
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <div className='radio'>
        <legend>Show/Hide entries:</legend>
        <input
          type='checkbox'
          checked={isvisible}
          name='isvisible'
          onChange={(e) => setIsvisible(e.target.checked)}
        />
      </div>

      <div className='works-list'>
        {work.map(
          ({ _id, title, description, customerWebsite, isVisible, image }) => (
            <div
              key={_id}
              className={
                isvisible && isVisible ? 'work-item show' : 'work-item hide'
              }
            >
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <a
                  href={customerWebsite}
                  target='_blank'
                  rel='noopener noreferrer'
                  alt='no pic'
                >
                  {customerWebsite}
                </a>
              </div>
              <div>
                <img src={image} alt={title} />
              </div>

              <div>
                <Link className='button' to={`${_id}`}>
                  Edit
                </Link>
                <button onClick={() => handleDeleteWork(_id)}>Delete</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ListWork;
