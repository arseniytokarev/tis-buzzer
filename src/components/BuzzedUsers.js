import React from 'react';

function BuzzedUsers({ buzzers }) {
  return (
    <div class='mt-4'>
      {buzzers.map((buzzer, i) => (
        <p className='mt-1'>{buzzer.name}</p>
      ))}
    </div>
  );
}

export default BuzzedUsers;
