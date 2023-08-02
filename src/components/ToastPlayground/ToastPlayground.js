import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';
import { ToastContext } from '../ToastProvider/ToastProvider';

import styles from './ToastPlayground.module.css';

export const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [toastVariant, setToastVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [toastMessage, setToastMessage] = React.useState('');

  const { dispatchToast } = React.useContext(ToastContext);

  /* HELPERS */
  function _resetForm() {
    _resetToastVariantField();
    _resetToastMessageField();
  }

  function _resetToastVariantField() {
    setToastVariant(VARIANT_OPTIONS[0]);
  }

  function _resetToastMessageField() {
    setToastMessage('');
  }

  /* HANDLERS */
  function handleSubmit(e) {
    e.preventDefault();

    dispatchToast(toastVariant, toastMessage);
    _resetForm();
  }

  function handleToastMessageChange(e) {
    setToastMessage(e.target.value);
  }

  function handleToastVariantChange(e) {
    setToastVariant(e.target.value);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

      <form className={styles.controlsWrapper} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              //
              value={toastMessage}
              onChange={handleToastMessageChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map(variant => {
              return (
                <label key={variant} htmlFor={`variant-${variant}`}>
                  <input
                    id={`variant-${variant}`}
                    type="radio"
                    name="variant"
                    value={variant}
                    //
                    checked={toastVariant === variant}
                    onChange={handleToastVariantChange}
                  />
                  {variant}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
