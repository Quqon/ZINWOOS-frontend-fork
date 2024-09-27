import { Link } from 'react-router-dom';
import { React, useEffect, useState } from 'react';
import './ListTable.scss';

const ListTable = ({ cartList, setCartList }) => {
  const [selectAll, setSelectAll] = useState(true);

  useEffect(() => {
    const checkedArr = cartList.map(item => item.checkbox);
    setSelectAll(!checkedArr.includes(0));
  }, [cartList]);

  const selectAllCheckbox = () => {
    const allChecked = cartList.every(item => item.checkbox === 1);
    const updatedCartList = cartList.map(item => ({
      ...item,
      checkbox: allChecked ? 0 : 1,
    }));
    setCartList(updatedCartList);
    setSelectAll(!allChecked);
  };

  const handleCheckbox = event => {
    const updatedCartList = cartList.map(item => {
      if (String(item.Item.id + (item.Option?.name || '')) === event.target.name) {
        return { ...item, checkbox: item.checkbox ? 0 : 1 };
      }
      return item;
    });
    setCartList(updatedCartList);
  };

  const removeItem = async () => {
    const deleteItemIds = cartList
      .filter(item => item.checkbox)
      .map(item => item.id);

    const response = await fetch(
      `https://port-0-zinwoos-backend-fork-m1kb43jnab9bc7ab.sel4.cloudtype.app/carts?cartId=${deleteItemIds.join('&cartId=')}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: localStorage.getItem('token'),
        },
      }
    );

    const data = await response.json();

    if (data.message === 'DELETE_SUCCESS') {
      const response = await fetch(
        'https://port-0-zinwoos-backend-fork-m1kb43jnab9bc7ab.sel4.cloudtype.app/carts?limit=50&offset=0',
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      const newData = await response.json();
      setCartList(newData.cartList);
    }
  };

  const setQuantitiy = async event => {
    const updatedCartList = await Promise.all(cartList.map(async item => {
      if (String(item.id) === event.target.name) {
        const newQuantity =
          event.target.innerHTML === '+'
            ? item.quantity + 1
            : item.quantity > 1
              ? item.quantity - 1
              : item.quantity;

        await fetch(
          `https://port-0-zinwoos-backend-fork-m1kb43jnab9bc7ab.sel4.cloudtype.app/carts/${event.target.innerHTML === '+' ? 'plus' : 'minus'
          }`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: localStorage.getItem('token'),
            },
            body: JSON.stringify({ cartId: item.id, quantity: newQuantity }),
          }
        ).catch(() => alert('서버와의 통신이 원활하지 않습니다.'));

        return { ...item, quantity: newQuantity };
      }
      return item;
    }));

    setCartList(updatedCartList);
  };

  const handleInput = event => {
    const updatedCartList = cartList.map(item => {
      if (String(item.id) === event.target.name) {
        return { ...item, quantity: Number(event.target.value) };
      }
      return item;
    });
    setCartList(updatedCartList);
  };

  const cartItems = cartList.map((item, i) => {
    return (
      <tr key={String(item.Item.id) + (item.Option ? item.Option.name : '')} className="cart-item">
        <td>
          <input
            name={String(item.Item.id) + (item.Option ? item.Option.name : '')}
            className="checkbox"
            type="checkbox"
            checked={item.checkbox}
            onChange={handleCheckbox}
          />
        </td>
        <td className="product-info">
          <span>
            <Link to="">
              <img
                src={`https://port-0-zinwoos-backend-fork-m1kb43jnab9bc7ab.sel4.cloudtype.app${item.Item.detail_image}`}
                alt="제품사진"
              />
            </Link>
          </span>
          <div>
            <div>{item.Item.name}</div>
            {item.Option && <div>{`옵션: ${item.Option.name}`}</div>}
          </div>
        </td>
        <td>
          <button
            name={item.id}
            onClick={setQuantitiy}
            className="count-btn"
          >
            -
          </button>
          <input
            name={item.id}
            className="number-box"
            type="number"
            value={item.quantity}
            onChange={handleInput}
          />
          <button
            name={item.id}
            onClick={setQuantitiy}
            className="count-btn"
          >
            +
          </button>
        </td>
        <td>{`${parseInt(Number(item.Item.price) + (item?.Option ? 30000 : 0)).toLocaleString()}원`}</td>
        <td>지누쓰마음</td>
        <td>무료배송</td>
        <td>{`${(item.quantity * (Number(item.Item.price) + (item?.Option ? 30000 : 0))).toLocaleString()}원`}</td>
      </tr>
    )
  });

  return (
    <>
      <table>
        <caption>장바구니 상품리스트</caption>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="select-all"
                onChange={selectAllCheckbox}
                checked={selectAll}
              />
            </th>
            <th>상품정보</th>
            <th>수량</th>
            <th>상품금액</th>
            <th>혜택</th>
            <th>배송비</th>
            <th>합계금액</th>
          </tr>
        </thead>
        <tbody>{cartItems}</tbody>
      </table>
      <div className="remove-box">
        <button onClick={removeItem} className="remove-btn">
          선택 상품 삭제
        </button>
      </div>
    </>
  );
};

export default ListTable;
