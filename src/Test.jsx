import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function StarRating({ initialRating }) {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');

  const handleRatingClick = (clickedRating) => {
    const newRating = Math.round(clickedRating * 2) / 2;
    setRating(newRating);
  };

  const handleRatingHover = (hoveredRating) => {
    setHover(hoveredRating);
  };

  const handleRatingLeave = () => {
    setHover(null);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the rating and comment to your backend
    console.log("Rating:", rating);
    console.log("Comment:", comment);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        let icon;

        if (ratingValue <= rating) {
          icon = <FaStar className="star text-yellow-500" />;
        } else if (ratingValue - 0.5 <= rating) {
          icon = <FaStarHalfAlt className="star" />;
        } else {
          icon = <FaStar className="star" />;
        }

        return (
          <label key={ratingValue}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRatingClick(ratingValue)}
            />
            {icon}
          </label>
        );
      })}
      <div className="rating-input-container">
        <input
          type="text"
          className="rating-input"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div className="comment-container">
        <textarea
          className="comment-input text-black"
          placeholder="Enter your comment..."
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default StarRating;
