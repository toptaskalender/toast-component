import React from 'react';

export default function useEscapeKey(key, callback) {
  React.useEffect(() => {
    function handleKeyDown(event) {
      const isEscapeKey = event.code === key;

      if (isEscapeKey) {
        callback();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
}
