import React from 'react';

import useKeyDown from '../../hooks/useKeyDown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toastList, setToastList] = React.useState([]);

  const handleEscapeKey = React.useCallback(() => {
    setToastList([]);
  }, []);

  useKeyDown('Escape', handleEscapeKey);

  function dispatchToast(variant, message) {
    const newToast = _createToast(variant, message);
    const nextToastList = [...toastList, newToast];

    setToastList(nextToastList);
  }

  function _createToast(variant, message) {
    return {
      id: crypto.randomUUID(),
      variant,
      message,
    };
  }

  function dismissToast(id) {
    const nextToastList = toastList.filter(toast => toast.id !== id);

    setToastList(nextToastList);
  }

  const value = {
    toastList,

    dispatchToast,
    dismissToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
