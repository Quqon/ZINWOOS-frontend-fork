import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedItemFile, setSelectedItemFile] = useState(null);
  const [inputItemName, setInputItemName] = useState('');
  const [inputItemDescription, setInputItemDescription] = useState('');
  const [inputItemPrice, setInputItemPrice] = useState('');
  const [inputItemDetail, setInputItemDetail] = useState('');
  const [inputItemDetailImage, setInputItemDetailImage] = useState('');
  const [inputItemSubCategoryId, setInputItemSubCategoryId] = useState('');
  const [inputItemMaxAmount, setInputItemMaxAmount] = useState('');
  const [inputItemStock, setInputItemStock] = useState('');

  const { itemName, update } = useParams();

  const [deleteItemName, setDeleteItemName] = useState('');

  const [updateName, setUpdateName] = useState('');
  const [updateItemName, setUpdateItemName] = useState('');
  const [updateItemDescription, setUpdateItemDescription] = useState('');
  const [updateItemPrice, setUpdateItemPrice] = useState('');
  const [updateItemDetail, setUpdateItemDetail] = useState('');
  const [updateItemMaxAmount, setUpdateItemMaxAmount] = useState('');
  const [updateItemStock, setUpdateItemStock] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminAccessToken');

    if (!token) {
      alert('관리자 권한이 필요합니다.');
      navigate('/');
      return;
    }

    fetch('http://127.0.0.1:3000/users/admin', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('권한이 없습니다.');
        }
      })
      .then((data) => {
        if (data.message === 'Welcome to the admin Page') {
          setIsAuthenticated(true);
        } else {
          throw new Error('권한이 없습니다.');
        }
      })
      .catch((error) => {
        alert(error.message);
        navigate('/');
      });
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>로딩 중...</div>;
  }

  const handleItemFileChange = (event) => {
    setSelectedItemFile(event.target.files[0]);
  }

  const handleInputItemName = (event) => {
    setInputItemName(event.target.value);
  }

  const handleInputItemDescription = (event) => {
    setInputItemDescription(event.target.value);
  }

  const handleInputItemPrice = (event) => {
    setInputItemPrice(event.target.value);
  }

  const handleInputItemDetail = (event) => {
    setInputItemDetail(event.target.value);
  }

  const handleInputItemDetailImage = (event) => {
    setInputItemDetailImage(event.target.value);
  }

  const handleInputItemSubCategoryId = (event) => {
    setInputItemSubCategoryId(event.target.value);
  }

  const handleInputItemMaxAmount = (event) => {
    setInputItemMaxAmount(event.target.value);
  }

  const handleInputItemStock = (event) => {
    setInputItemStock(event.target.value);
  }

  const itemSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedItemFile);
    formData.append('inputItemName', inputItemName);
    formData.append('inputItemDescription', inputItemDescription);
    formData.append('inputItemPrice', inputItemPrice);
    formData.append('inputItemDetail', inputItemDetail);
    formData.append('inputItemDetailImage', inputItemDetailImage);
    formData.append('inputItemSubCategoryId', inputItemSubCategoryId);
    formData.append('inputItemMaxAmount', inputItemMaxAmount);
    formData.append('inputItemStock', inputItemStock);

    try {
      const response = await fetch('http://127.0.0.1:3000/files/itemUpload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Item uploaded success") {
          alert('파일이 업로드 되었습니다.');
        }
      } else {
        console.error('Error: ', response.statusText);
        alert(`파일 업로드 실패: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error: ', error);
      alert(`파일 업로드 중 에러 발생: ${error.message}`)
    }
  }

  const handleDeleteItemName = (event) => {
    setDeleteItemName(event.target.value);
  }

  const deleteItem = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('deleteItemName', deleteItemName);
    console.log(formData.deleteItemName, 'formData')

    try {
      const response = await fetch(`http://127.0.0.1:3000/items/${deleteItemName}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const data = await response.json();
        if (data.message === "Item deleted success") {
          alert('파일이 삭제되었습니다.')
        } else {
          console.error(`Error: `, response.statusText);
          alert(`파일 삭제 실패: ${response.statusText}`)
        }
      }
    } catch (error) {
      console.error(`Error: `, error);
      alert(`파일 삭제 중 에러 발생: ${error.message}`)
    }
  }

  const handleUpdateName = (event) => {
    setUpdateName(event.target.value);
  }

  const handleUpdateItemName = (event) => {
    setUpdateItemName(event.target.value);
  }

  const handleUpdateItemDescription = (event) => {
    setUpdateItemDescription(event.target.value);
  }

  const handleUpdateItemPrice = (event) => {
    setUpdateItemPrice(event.target.value);
  }

  const handleUpdateItemDetail = (event) => {
    setUpdateItemDetail(event.target.value);
  }

  const handleUpdateItemMaxAmount = (event) => {
    setUpdateItemMaxAmount(event.target.value);
  }

  const handleUpdateItemStock = (event) => {
    setUpdateItemStock(event.target.value);
  }

  const updateItem = async (event) => {
    event.preventDefault();

    const params = {
      updateItemName,
      updateItemDescription,
      updateItemPrice,
      updateItemDetail,
      updateItemMaxAmount,
      updateItemStock,
    };

    try {
      const response = await axios.put(`http://127.0.0.1:3000/items/${updateName}`, null, {
        params: params,
      })
      console.log(response, 'response')

      if (response.status === 200 || response.status === 201) {
        const data = await response.data;
        if (data.message === 'Item update success') {
          alert('파일이 업데이트 되었습니다.');
        }
      } else {
        console.error('Error: ', response.statusText);
        alert(`파일 업데이트 실패: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error: ', error);
      alert(`파일 업데이트 중 에러 발생: ${error.message}`);
    }
  }

  return (
    <fragment className="container">
      <form onSubmit={itemSubmit}>
        <div className="item">
          <h1>item table upload form</h1>
          <div className="itemInputContainer">
            <div className="inputFirst">
              <h2>name</h2>
              <input value={inputItemName} onChange={handleInputItemName} />
              <h2>description</h2>
              <input value={inputItemDescription} onChange={handleInputItemDescription} />
              <h2>price</h2>
              <input value={inputItemPrice} onChange={handleInputItemPrice} />
              <h2>detail</h2>
              <input value={inputItemDetail} onChange={handleInputItemDetail} />
            </div>
            <div className="inputSecond">
              <h2>sub_category_name</h2>
              <input value={inputItemSubCategoryId} onChange={handleInputItemSubCategoryId} />
              <h2>max_amount</h2>
              <input value={inputItemMaxAmount} onChange={handleInputItemMaxAmount} />
              <h2>stock</h2>
              <input value={inputItemStock} onChange={handleInputItemStock} />
            </div>
          </div>
          <input name="itemSubmit" type="file" onChange={handleItemFileChange} />
          <button name="itemButton" type="submit">Upload</button>
        </div>
      </form>

      <fragment className="rightItems">
        <form onSubmit={deleteItem}>
          <div className="deleteItem">
            <h1>delete item</h1>
            <h2>itemName</h2>
            <input name="deleteItemInput" value={deleteItemName} onChange={handleDeleteItemName} />
            <button name="deleteButton" type="submit">Delete</button>
          </div>
        </form>

        <form onSubmit={updateItem}>
          <h1>update item</h1>
          <h2>updateItemName</h2>
          <input value={updateName} onChange={handleUpdateName}></input>
          <h2>name</h2>
          <input value={updateItemName} onChange={handleUpdateItemName} />
          <h2>description</h2>
          <input value={updateItemDescription} onChange={handleUpdateItemDescription}></input>
          <h2>price</h2>
          <input value={updateItemPrice} onChange={handleUpdateItemPrice}></input>
          <h2>Detail</h2>
          <input value={updateItemDetail} onChange={handleUpdateItemDetail}></input>
          <h2>max_amount</h2>
          <input value={updateItemMaxAmount} onChange={handleUpdateItemMaxAmount}></input>
          <h2>stock</h2>
          <input value={updateItemStock} onChange={handleUpdateItemStock}></input>
          <button name="updateButton" type="submit">Update</button>
        </form>
      </fragment>

    </fragment>
  )
};

export default AdminPage;
