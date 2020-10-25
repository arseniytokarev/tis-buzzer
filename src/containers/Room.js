import React, { useEffect, useState } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { Redirect, Link } from 'react-router-dom';
import { Howl, Howler } from 'howler';
import io from 'socket.io-client';
import { endpoint } from '../config';
import axios from 'axios';
import Player from '../components/Player';
import Host from '../components/Host';
import AllUsers from '../components/AllUsers';
import BuzzedUsers from '../components/BuzzedUsers';
import Timer from '../components/Timer';
import buzzerSound from '../assets/buzzersound.mp3';

let socket;

function Room(props) {
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState({});

  const sound = new Howl({
    src: [buzzerSound],
  });

  function buzzedClass() {
    if (room.buzzed.team === 'Red') return 'text-danger';
    if (room.buzzed.team === 'Blue') return 'text-primary';
  }

  const state = props.location.state;
  const isPlayer =
    state != undefined && state.hasOwnProperty('name') ? true : false;

  useEffect(() => {
    if (state === undefined) return props.history.replace('/');
    setRoom(state.room);

    socket = io(endpoint);

    if (isPlayer) {
      socket.emit('player joined', state);
    } else {
      socket.emit('create room', state.room);
      socket.emit('host joined', state.room);
    }

    if (isPlayer) {
      socket.on('redirect players', () => {
        props.history.replace('');
        socket.disconnect();
      });
    }

    socket.on('room data', data => {
      setUsers(data);
    });

    socket.on('room info', room => {
      setRoom(room);
    });

    socket.on('buzzer sound', () => {
      if (!isPlayer) {
        return sound.play();
      }
    });

    return () => {
      if (!isPlayer) {
        socket.emit('remove room', state.room);
      } else {
        socket.emit('exit room', state);
      }
      socket.disconnect();
    };
  }, []);

  useBeforeunload(() => {
    if (!isPlayer) {
      socket.emit('remove room', state.room);
    }
  });

  const handleBuzz = e => {
    socket.emit('buzz', state);
  };

  const handleClear = e => {
    socket.emit('clear', state.room);
  };

  const handleLock = e => {
    socket.emit('lock', state.room);
  };
  const handleUnlock = e => {
    socket.emit('unlock', state.room);
  };

  const addBlue = () => {
    socket.emit('add blue', state.room);
  };
  const minusBlue = () => {
    socket.emit('minus blue', state.room);
  };
  const addRed = () => {
    socket.emit('add red', state.room);
  };
  const minusRed = () => {
    socket.emit('minus red', state.room);
  };

  return (
    <div>
      <h4 className='center mb-4'>Room Name: {room.name}</h4>
      <div className='center'>
        <p className='text-danger mb-1'>Red points: {room.red}</p>
        <p className='text-primary mb-3'>Blue points: {room.blue}</p>
      </div>
      <div className='controls center mb-4'>
        {!isPlayer && (
          <Host
            locked={room.locked}
            handleClear={handleClear}
            handleLock={handleLock}
            handleUnlock={handleUnlock}
            addBlue={addBlue}
            minusBlue={minusBlue}
            addRed={addRed}
            minusRed={minusRed}
          />
        )}
      </div>
      {isPlayer && (
        <div className='center mb-3'>
          <Player handleBuzz={handleBuzz} locked={room.locked} />
        </div>
      )}

      <AllUsers users={users} />
      <div className='center'>
        <h4>Buzzed</h4>
        {room.buzzed !== undefined && (
          <p className={buzzedClass()}>{room.buzzed.name}</p>
        )}
      </div>
    </div>
  );
}

export default Room;
