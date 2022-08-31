import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Article from "./components/Article";
import Comment from "./components/Comment";
import EditPage from "./components/EditPage";
import DeletePage from "./components/DeletePage";
import PostService from "../../services/posts.service";

const Postpage = ({ currentUser }) => {
  const [editbutton, setEditButton] = useState(false);
  const [editPage, setEditPage] = useState(false);
  const [deletePage, setDeletePage] = useState(false);
  const [postData, setPostData] = useState(null);
  let { _id } = useParams();

  useEffect(() => {
    PostService.getOnePost(_id)
      .then((d) => {
        setPostData(d.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
