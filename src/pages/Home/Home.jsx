import React, { useContext } from 'react';
import { CustomContext } from '../../utils/Context';
import { Navigate } from 'react-router-dom';
import './home.scss';
import { ToastContainer } from 'react-toastify';
import Content from '../../Components/Content';
import Aside from '../../Components/Aside';

const Home = () => {
  const { user } = useContext(CustomContext);
  if (!user.email.length) {
    return <Navigate to="/login" />;
  }
  return (
    <section className="home">
      <Aside/>
      <Content/>
      
      <ToastContainer/>
    </section>
  );
};

export default Home;
