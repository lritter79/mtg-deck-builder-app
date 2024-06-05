import React from 'react';
import Sphere from './sphere/Sphere';
import './Loader.css'; // CSS file for styling

const Loader = () => {
  return (
    <div className="loader">
      <Sphere color="green" />
      <Sphere color="red" />
      <Sphere color="blue" />
      <Sphere color="grey" />
      <Sphere color="black" />
      <Sphere color="white" />
      <p className="text-white animate-pulse">Loading...</p>
    </div>
  );
};

export default Loader;
