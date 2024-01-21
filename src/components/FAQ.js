import React from 'react';

const FAQ = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;