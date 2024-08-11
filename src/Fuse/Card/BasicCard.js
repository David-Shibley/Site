import React, { useState, useEffect } from 'react';
import { Card, Button } from '@material-ui/core';

const BasicCard = ({ children, onClick, backgroundColor, fade, owner, ...props }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (fade) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setIsExiting(false);
      }, 500); // Match this duration with your CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [fade]);

  return (
    <Card
      style={{
        height: '300px',
        width: '300px',
        margin: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor || 'white',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'translateY(20px)' : 'translateY(0)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        boxShadow: owner ? `0 4px 8px ${owner.color}` : '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
      }}
      onClick={onClick}
      {...props}
    >
      <Button style={{ display: 'flex', flexDirection: 'column' }}>
        {children}
      </Button>
    </Card>
  );
};

export default BasicCard;
