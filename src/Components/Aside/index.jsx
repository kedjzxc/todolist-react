import React, { useContext, useState } from 'react';
import './aside.scss';
import { dataColors } from '../../utils/dataColors';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { CustomContext } from '../../utils/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './aside.scss'

const Aside = () => {
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState(dataColors[0]);
  const [category, setCategory] = useState('');
  const { user, setUser, status, setStatus } = useContext(CustomContext);

  const addCategory = () => {
    let newCategory = {
      categoryName: category,
      id: uuidv4(),
      color: selected,
      tasks: [],
    };
    axios
      .patch(`http://localhost:8080/users/${user.id}`, {
        categories: [...user.categories, newCategory],
      })
      .then(({ data }) => {
        setUser({
          ...data,
          token: user.token,
        });
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...data,
            token: user.token,
          }),
        );
        setModal((modal) => !modal);
        setCategory('');
        toast('Категория добавлена');
      })
      .catch((err) => toast(`Категория не добавлена, ${err.message}`));
  };

  const storageClear = () => {
    localStorage.removeItem('user');
    setUser({
      email: '',
    });
  };

  const checkCategories = () => {
    if (user.categories.findIndex((item) => item.categoryName === category) > -1) {
      toast('Категория уже есть');
    } else {
      addCategory();
    }
  };

  const deleteCategory = (id) => {
    let newArrCategories = user.categories.filter((item) => item.id !== id);
    axios
      .patch(`http://localhost:8080/users/${user.id}`, { categories: newArrCategories })
      .then(({ data }) => {
        setUser({
          ...data,
          token: user.token,
        });
        localStorage.setItem(
          'user',
          JSON.stringify({
            ...data,
            token: user.token,
          }),
        );
        toast('Категория удалена');
      })
      .catch((err) => toast(`Категория не удалена, ${err.message}`));
  };

  return (
    <aside className="aside">
      <button className="aside__exit" onClick={storageClear}>
        Выйти
      </button>
      <div className={`aside__title ${status === 'all' ? 'active' : ''}`} onClick={() => setStatus('all')}>
        <svg
          className="aside__title-img"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z"
            fill="#7C7C7C"
          />
        </svg>
        <p className="aside__title-text">Все задачи</p>
      </div>
      <ul className="aside__categories">
        {user.categories.map((task) => (
          <li key={task.id} className={`aside__categories-item ${status === task.categoryName ? 'active' : ''}`} onClick={() => setStatus(task.categoryName)}>
            <span
              className="aside__categories-round"
              style={{ backgroundColor: task.color }}></span>{' '}
            <span className="aside__categories-text">{task.categoryName}</span>
            <span className="aside__categories-delete" onClick={(e) => {
                e.stopPropagation()
                deleteCategory(task.id)
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                <path
                  fill="none"
                  stroke="#ccc"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
                />
              </svg>
            </span>
          </li>
        ))}
      </ul>
      <div style={{ position: 'relative' }}>
        <div className="aside__add" onClick={() => setModal((modal) => !modal)}>
          <svg
            className="aside__add-img"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 1V11"
              stroke="#868686"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 6H11"
              stroke="#868686"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="aside__add-text">Добавить категорию</p>
        </div>
        <div className="aside__modal" style={{ display: modal ? 'block' : 'none' }}>
          <div className="aside__modal-inner">
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              className="aside__modal-input"
              placeholder="Название категории"
            />
            <div className="aside__modal-colors">
              {dataColors.map((color, index) => (
                <span
                  key={color}
                  onClick={() => setSelected(color)}
                  className="aside__modal-colors-item"
                  style={{
                    backgroundColor: color,
                    border: selected === color ? '2px solid #000' : 'none',
                  }}></span>
              ))}
            </div>
            <button type="button" className="aside__modal-btn" onClick={checkCategories}>
              Добавить
            </button>
            <button className="aside__modal-close" type="button" onClick={() => setModal(!modal)}>
              <svg
                className="aside__modal-close-img"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14.0625 5.9375L5.9375 14.0625M5.9375 5.9375L14.0625 14.0625"
                  stroke="#fff"
                  strokeWidth="1.875"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
