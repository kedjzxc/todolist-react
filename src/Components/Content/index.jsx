import React, { useContext, useState } from 'react';
import './content.scss';
import { CustomContext } from '../../utils/Context';
import ContentCategory from '../ContentCategory';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Content = () => {
  const { status, user, setUser} = useContext(CustomContext);
  const [active, setActive] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });


  const addTask = (data) => {
    let newTask = {
      ...data,
      id: uuidv4(),
      isComplete: false
    }

    let newCategories = user.categories.map((item) => {
      if (item.categoryName === status) {
        return {...item, tasks: [...item.tasks, newTask]}
      } else {
        return item
      }
    })

    axios.patch(`http://localhost:8080/users/${user.id}`, {categories: newCategories})
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
      setActive(false);
      reset()

      toast('Задача добавлена');
    })
    .catch((err) => toast(`Задача не добавлена, ${err.message}`));
  }

  const checkTasks = (data) => {
    let exist = user.categories.find((item) => item.categoryName === status).tasks.findIndex((item) => item.taskTitle === data.taskTitle)
    if (exist > -1) {
      toast('Задача уже есть');
    } else {
      addTask(data);
    }
  };


  return (
    <div className="content">
      <div className="content__tasks">
        {status === 'all' ? (
          user.categories.map((item) => (
            <ContentCategory key={item.id} status={item.categoryName} />
          ))
        ) : (
          <ContentCategory status={status} />
        )}
      </div>
      <div className="content__add" onClick={() => setActive(!active)}>
        <svg
          className="content__add-img"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 1V15"
            stroke="#B4B4B4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 8H15"
            stroke="#B4B4B4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="content__add-text">Новая задача</p>
      </div>
      <div className={`content__add-modal ${active ? 'active' : ''}`}>
        <form noValidate action="" className="content__add-modal-inner" onSubmit={handleSubmit(checkTasks)}>
          <input
            {...register('taskTitle', {
              minLength: {
                message: 'Минимальная длина 3 символа',
                value: 3,
              },
            })}
            className="content__add-modal-input"
            type="text"
            placeholder="Текст задачи"
          />
          <p className="form__error">{errors.taskTitle && errors.taskTitle.message}</p>
          <div className="content__add-modal-buttons">
            <button className="content__add-modal-button button__add" type="submit">
              Добавить задачу
            </button>
            <button
              className="content__add-modal-button button__cancel"
              type="button"
              onClick={() => setActive(false)}>
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Content;
