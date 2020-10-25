import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endpoint } from '../config';

function Join(props) {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [team, setTeam] = useState('Red');
  const [message, setMessage] = useState('');

  const handleJoin = async e => {
    e.preventDefault();

    try {
      if (!name || !room) return setMessage('Please enter all fields');
      let player = { name, room, team };
      const res = await axios.post(endpoint + '/join', { player });
      props.history.push({
        pathname: '/room',
        state: player,
      });
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <form>
      <div className='form-group'>
        <label htmlFor='formGroupExampleInput'>Nickname</label>
        <input
          type='text'
          className='form-control'
          id='formGroupExampleInput'
          value={name}
          onChange={e => setName(e.target.value)}
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <label htmlFor='formGroupExampleInput2'>Room</label>
        <input
          type='text'
          className='form-control'
          id='formGroupExampleInput2'
          value={room}
          onChange={e => setRoom(e.target.value)}
          autoComplete='off'
        />
      </div>
      <div className='form-group'>
        <label>Select team</label>
        <select
          className='form-control'
          id='exampleFormControlSelect1'
          value={team}
          onChange={e => setTeam(e.target.value)}
        >
          <option>Red</option>
          <option>Blue</option>
        </select>
      </div>

      {message && <p className='mt-3 text-danger'>{message}</p>}
      <button type='submit' className='btn btn-primary' onClick={handleJoin}>
        Join
      </button>
      <Link to='/create' className='float-right'>
        Create room
      </Link>
    </form>
  );
}

export default Join;
