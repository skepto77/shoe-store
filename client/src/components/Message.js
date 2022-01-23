import React from 'react';
import cn from 'classnames';

const Message = ({ isError, children }) => {
  const messageClass = cn('alert text-center', {
    'alert-danger': isError,
    'alert-success': !isError,
  });
  return (
    <div className='row d-flex justify-content-center mb-3'>
      <div className={messageClass} role='alert'>
        {children}
      </div>
    </div>
  );
};

export default Message;
