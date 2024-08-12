// Table.js
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

const Head = 'text-xs text-left text-dry font-semibold px-6 py-2 uppercase';
const Text = 'text-sm text-left leading-6 whitespace-nowrap px-6';

const Rows = ({ product, onDeleteHandler, admin }) => {
  return (
    <tr key={ product._id }>
      <td className={ `${Text}` }>
        <div className='w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden'>
          <img className='h-full w-full object-cover' src={ product?.image ? product?.image : "/images/user.jpg" } alt={ product?.name } />
        </div>
      </td>
      <td className={ `${Text} truncate` }>{ product.name }</td>
      <td className={ `${Text}` }>{ product.category }</td>
      <td className={ `${Text}` }>{ product.gender }</td>
      <td className={ `${Text}` }>{ product.size }</td>
      <td className={ `${Text}` }>{ product.material }</td>
      <td className={ `${Text}` }>{ product.prise } $</td>
      <td className={ `${Text}` }>{ product.stock } шт.</td>
      <td className={ `${Text} float-right flex-rows gap-2` }>
        { admin ? (
          <>
            <Link to={ `/edit/${product?._id}` } className='border border-border bg-dry flex-rows gap-2 text-white rounded py-1 px-2'>
              Редагувати <FaEdit className='text-orange-400' />
            </Link>
            <button onClick={ () => onDeleteHandler(product?._id) } className='bg-delete text-white rounded flex-colo w-7 h-7'>
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button
              className='bg-delete text-white rounded flex-colo w-7 h-7'
              onClick={ () => onDeleteHandler(product._id) }
            >
              <MdDelete />
            </button>
          </>
        ) }
      </td>
    </tr>
  );
};

function Table({ data, onDeleteHandler, admin }) {
  return (
    <div className='overflow-x-scroll overflow-hidden relative w-full'>
      <table className='w-full table-auto border border-border divide-y divide-border'>
        <thead>
          <tr className='bg-dryGray'>
            <th scope='col' className={ `${Head}` }>
              Фото
            </th>
            <th scope='col' className={ `${Head}` }>
              Назва
            </th>
            <th scope='col' className={ `${Head}` }>
              Категорія
            </th>
            <th scope='col' className={ `${Head}` }>
              Для кого
            </th>
            <th scope='col' className={ `${Head}` }>
              Розмір
            </th>
            <th scope='col' className={ `${Head}` }>
              Матеріал
            </th>
            <th scope='col' className={ `${Head}` }>
              ціна
            </th>
            <th scope='col' className={ `${Head}` }>
              Залишок
            </th>
            <th scope='col' className={ `${Head} text-end` }>
              Дія
            </th>
          </tr>
        </thead>
        <tbody className='bg-main divide-y divide-gray-800'>
          { data.map((product) => (
            <Rows key={ product._id } product={ product } onDeleteHandler={ onDeleteHandler } admin={ admin } />
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default Table;