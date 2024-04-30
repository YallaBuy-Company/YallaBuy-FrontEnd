import React from 'react';

const Ads = ({ imageUrl, altText, linkUrl }) => {
  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <img src={imageUrl} alt={altText} />
    </a>
  );
};

export default Ads;
