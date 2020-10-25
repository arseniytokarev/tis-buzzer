import React from 'react';

function Player({ handleBuzz, locked }) {
  return (
    <div>
      {locked ? (
        <button class='button warning' disabled>
          Locked
        </button>
      ) : (
        <button class='button primary' onClick={handleBuzz}>
          Buzz
        </button>
      )}
    </div>
  );
}

export default Player;
