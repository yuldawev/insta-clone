import { useState, useEffect } from "react";
import "./sass/App.scss";
import Post from "./components/Posts";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { Button, Input, Modal } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ImageUpload from "./components/ImageUpload";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    backgroundColor: "white",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, - ${left}%,)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.primary.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState();
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  async function getPosts() {
    const querySnapshot = await getDocs(
      collection(db, "posts").orderBy("timestamp", "desc")
    );
    const temp = [];
    querySnapshot.forEach((doc) => {
      temp.push(doc.data());
    });
    setPosts(temp);
  }

  useEffect(() => {
    getPosts();
  }, []);

  const singUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const singIn = (event) => {
    event.preventDefault();
    SignInWithEmailAndPassword(auth, email, password).catch((error) =>
      alert(error.message)
    );
    setOpenSignIn(false);
  };t

  return (
    <div className="app">
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        className="modal"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_singup">
            <img
              className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="sumbit" onClick={singIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="app_loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>

      <h1>HELLO Clever Programmers Let's build an Instagram Clone</h1>
      <div className="app_posts">
      <div className="app_postsLeft">
        {posts.map((post, index) => (
          <Post
            key={index}
            postId={id}
            user={user}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        ))}
        </div>
      </div>
      <div className="app_postsRight">
      <InstagramEmbed
      url='https://www.instagram.com/p/B_uf9dmAGPw/'
      maxWidth={320}
      hideCaption={false}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}
    />
    </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
