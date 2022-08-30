import React, { useState } from "react";
import Article from "./components/Article";
import Comment from "./components/Comment";
import EditPage from "./components/EditPage";
import DeletePage from "./components/DeletePage";

const Postpage = () => {
  const [editbutton, setEditButton] = useState(false);
  const [editPage, setEditPage] = useState(false);
  const [deletePage, setDeletePage] = useState(false);
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
      <Article
        editbutton={editbutton}
        handleEditPage={handleEditPage}
        setDeletePage={setDeletePage}
      />
      <Comment />
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
