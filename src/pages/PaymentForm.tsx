import React, { useState } from 'react';
import './PaymentForm.css';

interface PaymentFormProps {
  amount: number;
  onClose: () => void;
  onPayment: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, onClose, onPayment }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numeric = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(numeric.replace(/(.{4})/g, '$1 ').trim());
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let numeric = e.target.value.replace(/\D/g, '').slice(0, 4);
    setExpiry(numeric.length > 2 ? numeric.slice(0, 2) + '/' + numeric.slice(2) : numeric);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value.replace(/\D/g, '').slice(0, 4));
  };

  const handlePayClick = () => {
    const cardDigits = cardNumber.replace(/\s/g, '');
    const expParts = expiry.split('/');
    const expMonth = parseInt(expParts[0], 10);
    const expYear = parseInt(expParts[1], 10);

    if (
      cardDigits.length !== 16 ||
      expiry.length !== 5 ||
      expParts.length !== 2 ||
      isNaN(expMonth) || isNaN(expYear) ||
      expMonth < 1 || expMonth > 12 ||
      cvc.length < 3 || cvc.length > 4
    ) {
      setErrorMessage('Пожалуйста, введите корректные данные карты.');
      return;
    }

    onPayment();
    onClose();
  };

  return (
    <div className="payment-modal-backdrop">
      <div className="payment-modal-content">
        <button className="payment-close-button" onClick={onClose}>×</button>
        <h2>Оплата заказа</h2>
        <div style={{ marginBottom: 16, fontWeight: 600, fontSize: 18 }}>
          К оплате: <span style={{ color: '#1a1a1a' }}>{amount.toFixed(2)} ₽</span>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="payment-field">
          <label>Номер карты</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
          />
        </div>
        {/* Вот тут всё красиво и не вылазит */}
        <div className="field-group">
          <div className="payment-field">
            <label>Срок действия</label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>
          <div className="payment-field">
            <label>CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={handleCvcChange}
              placeholder="CVC"
              maxLength={4}
            />
          </div>
        </div>
        <button className="pay-button" onClick={handlePayClick}>
          Оплатить {amount.toFixed(2)} ₽
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
