import React from 'react';

function Host({
  handleLock,
  handleUnlock,
  locked,
  handleClear,
  addBlue,
  addRed,
  minusRed,
  minusBlue,
}) {
  const lockButton = (
    <button className='btn btn-warning' onClick={handleLock}>
      Lock
    </button>
  );
  const unlockButton = (
    <button className='btn btn-warning' onClick={handleUnlock}>
      Unlock
    </button>
  );
  return (
    <>
      <div className='mb-2'>
        <button onClick={addBlue} className='btn btn-primary mr-2'>
          +
        </button>
        <button onClick={minusBlue} className='btn btn-primary mr-2'>
          -
        </button>
        <button onClick={addRed} className='btn btn-danger mr-2'>
          +
        </button>
        <button onClick={minusRed} className='btn btn-danger mr-2'>
          -
        </button>
      </div>
      <div>
        {locked ? unlockButton : lockButton}
        <button onClick={handleClear} className='btn btn-info ml-2'>
          Clear
        </button>
      </div>
    </>
  );
}

export default Host;
