import React from 'react';

function AllUsers({ users }) {
  let redUsers = users.filter(user => user.team === 'Red');
  let blueUsers = users.filter(user => user.team === 'Blue');

  return (
    <div className='all-users'>
      <h4 className='mb-1'>All Players</h4>
      <div>
        <div className='users'>
          {redUsers.map((user, i) => (
            <p className='red-user text-danger pb-0 mb-1'>{user.name}</p>
          ))}
        </div>
        {!(blueUsers.length === 0 || redUsers.length === 0) && (
          <div className='spacer'></div>
        )}
        <div className='users'>
          {blueUsers.map((user, i) => (
            <p className='blue-user text-primary pb-0'>{user.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
