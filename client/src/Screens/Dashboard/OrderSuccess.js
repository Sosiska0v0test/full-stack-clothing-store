// OrderSuccess.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function OrderSuccess() {
  const location = useLocation();
  const { orderNumber, totalAmount, email } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Замовлення успішно оформлене!</h1>
      { orderNumber && (
        <div className="bg-white p-6 rounded shadow-md text-center">
          <p className="mb-2"><strong>Номер замовлення:</strong> { orderNumber }</p>
          <p className="mb-2"><strong>Загальна сума:</strong> { totalAmount } $</p>
          <p className="mb-2"><strong>Електронна пошта:</strong> { email }</p>
          <p className="mb-2">Менеджер скоро з вами зв'яжеться для підтвердження купівлі.</p>
        </div>
      ) }
      <Link to="/" className="text-blue-500 hover:underline mt-4">Повернутися на головну сторінку</Link>
    </div>
  );
}

export default OrderSuccess;
