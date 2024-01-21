import React, { useState } from 'react';
import '../style.css'; // Import the CSS file

const FAQ = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleItem = (itemId) => {
    setExpandedItems((prevItems) =>
      prevItems.includes(itemId)
        ? prevItems.filter((item) => item !== itemId)
        : [...prevItems, itemId]
    );
  };

  return (
    <div className="faq-container">
      <div className="faq-header">FAQ</div>
      {data.map((item) => (
        <div key={item.id}>
          <h3 className="faq-question" onClick={() => toggleItem(item.id)} style={{ cursor: 'pointer' }}>
            {item.question}
          </h3>
          {expandedItems.includes(item.id) && <p className="faq-answer">{item.answer}</p>}
        </div>
      ))}
    </div>
  );
};

export default FAQ;