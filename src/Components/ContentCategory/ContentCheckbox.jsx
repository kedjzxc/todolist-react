import React, {useContext} from 'react'
import { CustomContext } from '../../utils/Context';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const ContentCheckbox = ({isComplete, id}) => {
  const { status, user, setUser} = useContext(CustomContext);

  const removeTask = (id) => {
    setTimeout(() => {
      let newCategories = user.categories.map((item) => {
        if (item.categoryName === status) {
          return {...item, tasks: item.tasks.filter((el) => el.id !== id)}
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
        toast('Задача удалена');
      })
      .catch((err) => toast(`Задача не удалена, ${err.message}`));

    }, 300)
    
  }
  return (
    <input onClick={() => removeTask(id)} className={`content__tasks-input ${isComplete ? 'active' : ''}`} type="checkbox" id="checkbox" />
    )
}

export default ContentCheckbox