import React from 'react';
import './Sphere.css'; // CSS file for styling

type SphereProps = {
  color?: 'green' | 'red' | 'blue' | 'grey' | 'black' | 'white'; // Color prop with specified options
};

const Sphere: React.FC<SphereProps> = ({ color = 'grey' }) => {
  return (
    <div className={`sphere ${color}`}>
      <div className="circle">
        <div className="reflection"></div>
      </div>
      <div className="shadow"></div>
    </div>
  );
};

export default Sphere;
