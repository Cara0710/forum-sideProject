import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Article from "./components/Article";
import Comment from "./components/Comment";
import EditPage from "./components/EditPage";
import DeletePage from "./components/DeletePage";
import PostsService from "../../services/posts.service";
import NotFound from "../../components/NotFound";

const Postpage = ({
  currentUser,
  setAllPostData,
  allPostDataStatus,
  allPostData,
}) => {
  const [editbutton, setEditButton] = useState(false);
  const [editPage, setEditPage] = useState(false);
  const [deletePage, setDeletePage] = useState(false);
  const [postData, setPostData] = useState(null);
  const [average, setAverage] = useState(0);
  const postDataStatus = useRef(false);
  let { _id } = useParams();
  const [loading, setLoading] = useState(false);
  const [notFindPage, setNotFindPage] = useState(false);

  // initialize get onepost data
  useEffect(() => {
    setLoading(true);
    PostsService.getOnePost(_id)
      .then((d) => {
        setLoading(false);
        setPostData(d.data);
        if (d.data === "") {
          setNotFindPage(true);
        }
      })
      .catch((e) => {
        setLoading(false);
        setNotFindPage(true);
      });
  }, []);

  //if post data change then restart get all post
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
    }
    if (!postDataStatus.current) {
      return;
    }

    PostsService.getAllPost()
      .then((d) => {
        setAllPostData(d.data);
        postDataStatus.current = false;
      })
      .catch((e) => {
        console.log(e);
      });
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
      {loading && (
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

      {/* not find page */}
      {notFindPage && <NotFound />}
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
          postDataStatus={postDataStatus}
        />
      )}
      {/* article edit page */}
      {editPage && (
        <EditPage
          data={postData}
          editPage={editPage}
          handleEditPage={handleEditPage}
          postDataStatus={postDataStatus}
          setPostData={setPostData}
        />
      )}

      {/* article delete page */}
      {deletePage && (
        <DeletePage
          data={postData}
          deletePage={deletePage}
          setDeletePage={setDeletePage}
          allPostDataStatus={allPostDataStatus}
          setAllPostData={setAllPostData}
        />
      )}
    </div>
  );
};

export default Postpage;
