import React from 'react';

function BuzzedUsers({ buzzers }) {
  return (
    <div class=''>
      {buzzers.map((buzzer, i) => (
        <p className=''>{buzzer.name}</p>
      ))}
    </div>
  );
}

export default BuzzedUsers;
