// LoadingSpinner.jsx
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-container">
    <svg viewBox="0 0 100 100" className="loading-svg">
      <g fill="none" stroke="#676FFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        {/* Vertical Lines */}
        <path d="M 30 30 V 70">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="0 30 50; 180 30 50; 360 30 50"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path d="M 70 30 V 70">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="0 70 50; -180 70 50; -360 70 50"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>

        {/* Center Box Structure */}
        <path d="M 30 30 L 70 30 L 70 70 L 30 70 Z">
          <animate
            attributeName="stroke-opacity"
            values="1;0.2;1"
            dur="2s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="0 50 50; 180 50 50; 360 50 50"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>

        {/* Inner Diamond */}
        <path d="M 50 20 L 80 50 L 50 80 L 20 50 Z">
          <animate
            attributeName="stroke-opacity"
            values="0.2;1;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            values="0 50 50; -180 50 50; -360 50 50"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>

        {/* Outer Circle */}
        <circle cx="50" cy="50" r="45">
          <animate
            attributeName="stroke-opacity"
            values="0.2;1;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="45;40;45"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
    <h2>Loading...</h2>
  </div>
);

export default LoadingSpinner;