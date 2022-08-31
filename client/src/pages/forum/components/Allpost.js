import React, { useState } from "react";
import Posts from "../../components/Posts";

const Allpost = ({ index, setIndex, allPostData }) => {
  return (
    <div className="allpost">
      {/* loading css animation */}
      {!allPostData && (
        <div className="loading-box">
          <div className="loading la-ball-8bits la-2x">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {allPostData &&
        allPostData.map((data) => {
          return <Posts data={data} key={data._id} />;
        })}
    </div>
  );
};

export default Allpost;
