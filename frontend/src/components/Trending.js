// Testimonial.js

import moment from "moment";
import React from "react";

const Testimonial = ({ image, title, description, createdAt, author }) => {
  return (
    <div className="w-full p-4 border border-gray-300 rounded-md mb-4">
      <div className="flex items-center space-x-2 py-1">
        <img
          src={image}
          alt={title}
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="flex flex-col ml-2">
          <p>{author}</p>

          <p className="text-sm mb-[2px] text-slate-400">
            {moment(createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <div>
          <h4 className="text-lg font-bold">{title}</h4>
          <p>{description?.substring(0, 40)}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
