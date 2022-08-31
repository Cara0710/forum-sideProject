import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Article from "./components/Article";
import Comment from "./components/Comment";
import EditPage from "./components/EditPage";
import DeletePage from "./components/DeletePage";
import PostsService from "../../services/posts.service";

const Postpage = ({ currentUser, setAllPostData }) => {
  const [editbutton, setEditButton] = useState(false);
  const [editPage, setEditPage] = useState(false);
  const [deletePage, setDeletePage] = useState(false);
  const [postData, setPostData] = useState(null);
  const [average, setAverage] = useState(0);
  let { _id } = useParams();

  // initialize get onepost data
  useEffect(() => {
    PostsService.getOnePost(_id)
      .then((d) => {
        setPostData(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //if post data change then restart get all post an averaged
  useEffect(() => {
    // caculate average
    if (postData) {
      const number = postData.comments.map((d) => {
        return d.dangerous;
      });
      if (number.length === 0) return setAverage(0);
      const result = number.reduce((pre, cur) => {
        return pre + cur;
      });
      setAverage(result / number.length);

      // restart get all post
      PostsService.getAllPost()
        .then((d) => {
          console.log(d.data);
          setAllPostData(d.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [postData]);
  // make edit article button visible
  const handleEditButton = (e) => {
    if (e.target.className !== "edit-button") return setEditButton(false);
    editbutton ? setEditButton(false) : setEditButton(true);
  };
  // crotrol edit page visiable
  const handleEditPage = (status) => {
    setEditPage(status);
  };
  return (
    <div className="postpage" onClick={handleEditButton}>
      {/* loading css animation */}
      {!postData && (
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
      {postData && (
        <Article
          editbutton={editbutton}
          handleEditPage={handleEditPage}
          setDeletePage={setDeletePage}
          data={postData}
          average={average}
          currentUser={currentUser}
        />
      )}
      {postData && (
        <Comment
          currentUser={currentUser}
          data={postData}
          setPostData={setPostData}
        />
      )}

      {editPage && (
        <EditPage editPage={editPage} handleEditPage={handleEditPage} />
      )}
      {deletePage && (
        <DeletePage deletePage={deletePage} setDeletePage={setDeletePage} />
      )}
    </div>
  );
};

export default Postpage;
