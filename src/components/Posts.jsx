import Avatar from "@mui/material/Avatar";
import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import "../sass/Post.scss";
import firebase from "firebase";

// import r from "/src/assets/img/r.png"

function Post({ username, caption, user, imageUrl, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
  });

  return (
    () => {
      unsubscribe();
    },
    [postId]
  );
}

const postComment = (event) => {
  event.preventDefault();
  const querySnapshot = await getDocs(
    collection(db, "posts")..orderBy("timestamp", "desc")
  );
  db.collection("posts").doc(postId).collection("comments").add({
    text: comment,
    username: user.displayName,
    timestamp: storage.FieldValue.serverTimestamp(),
  });
  setComment("");

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="Remy Sharp"
          src="/src/assets/img/r.png"
        />
        <h3>{username}</h3>
      </div>

      <img className="post_image" src={imageUrl} alt="" />
      <h4 className="post_text">
        <strong>{username}</strong>: {caption}
      </h4>

      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong>
            {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post_commentBox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
