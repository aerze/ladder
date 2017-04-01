import React from 'react';

export default ({ error }) => {
  if (!error) return null;
  return (
    <div>
      <h2>{error.message}</h2>
      <pre>
        {error.stack}
      </pre>
    </div>
  );
};
