import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoint } from '../config';

function Create(props) {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');

  const handleCreate = async e => {
    e.preventDefault();

    try {
      if (!room) return setMessage('Room cannot be blank');
      const res = await axios.post(endpoint + '/create', { room });
      props.history.push({
        pathname: '/room',
        state: { room },
      });
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <form>
      <div className='form-group'>
        <label htmlFor='formGroupExampleInput'>Room name</label>
        <input
          type='text'
          className='form-control'
          id='formGroupExampleInput'
          value={room}
          autoComplete='off'
          onChange={e => setRoom(e.target.value)}
        />
      </div>

      <button type='submit' class='btn btn-primary' onClick={handleCreate}>
        Create
      </button>
      <Link to='/' className='float-right'>
        Join a room
      </Link>
      {message && <p className='mt-3 text-danger'>{message}</p>}
    </form>
  );
}

export default Create;
