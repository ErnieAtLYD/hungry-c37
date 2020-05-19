// components/Card.jsx

import React from 'react';

const Card = ({ place }) => {
  return (
    <div className="column is-one-quarter">
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <a href={place.url}>
              <img src={place.image_url} alt={place.name} />
            </a>
          </figure>
        </div>
        <div className="card-content is-centered">
          <p class="title is-5">{place.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
