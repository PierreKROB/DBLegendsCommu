import React from 'react';

const CustomFormErrorMessage = ({ children }) => {
  return (
    <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.75rem' }}>
      {children}
    </div>
  );
};

export default CustomFormErrorMessage;
