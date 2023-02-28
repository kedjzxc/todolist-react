import React, { useContext } from 'react';
import { CustomContext } from '../../utils/Context';
import ContentCheckbox from './ContentCheckbox';

const ContentCategory = ({ status }) => {
  const { user, setUser } = useContext(CustomContext);

  

  return (
    <>
    <div className="content__title-wrap">
        <h2 className="content__title">{status}</h2>
      </div>
      {status !== 'all'
        ? user.categories
            .find((item) => item.categoryName === status)
            .tasks.map((item) => (
              <div key={item.id} className="content__tasks-item">
                <ContentCheckbox id={item.id} isComplete={item.isComplete}/>
                <label className="content__tasks-label" htmlFor="checkbox">
                  {item.taskTitle}
                </label>
              </div>
            ))
        : ''}
    </>
  );
};

export default ContentCategory;
