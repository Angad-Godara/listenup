import { React, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/SideBar";
import BottomBar from "./Components/BottomBar";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register"
import Forgot from "./Components/Login/Forgot"
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./stores/userSlice";
import db, { auth } from "./firebase";
import Home from "./views/Home";
import Navbar from "./Components/Navbar";
import Search from "./views/Search";
import Collection from "./views/Collection";
import { storeAllPodcasts } from "./stores/podcastSlice";

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchAllPodcasts = () => {
      db
        .collection('podcasts')
        .onSnapshot(snap => {
          dispatch(storeAllPodcasts(snap.docs.map(pod => ({
            title: pod.data()?.title,
            id: pod?.id,
            description: pod.data()?.description,
            genre: pod.data()?.genre,
            src: pod.data()?.src,
            video: pod.data()?.src,
            image: pod.data()?.thumbnail,
            artist: pod.data()?.artist,
            isVideo: (pod.data()?.type === 'video' ? true : false),
          }))))
        })
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {

      fetchAllPodcasts();

      if (authUser) {
        // fetching user from db
        db
          .collection('users')
          .doc(authUser?.uid)
          .onSnapshot(snap => {
            dispatch(login({
              uid: authUser?.uid,
              photoURL: snap.data()?.photoURL,
              username: snap.data()?.username,
              email: snap.data()?.email,
              uploads: snap.data()?.uploads,
              vidUploads: snap.data()?.vidUploads,
              audUploads: snap.data()?.audUploads,
              favourites: snap.data()?.favourites,
            }))
          })

      } else {
        dispatch(logout())
      }
    })

    return unsubscribe
  }, [])


  return (
    <>
      {(user)
        ?
        <Routes>
          <Route path="/" element={<>
            <div className="wrapper">
              <Sidebar />
              <main className="flex-auto overflow-auto">
                <Navbar />
                <div className="px-8 py-5">
                  <Home />
                </div>
              </main>
            </div>
            <BottomBar />
          </>} />
          <Route path="/search" element={<>
            <div className="wrapper">
              <Sidebar />
              <main className="flex-auto overflow-auto">
                <Navbar />
                <div className="px-8 py-5">
                  <Search />
                </div>
              </main>
            </div>
            <BottomBar />
          </>} />
          <Route path="/collection" element={<>
            <div className="wrapper">
              <Sidebar />
              <main className="flex-auto overflow-auto">
                <Navbar />
                <div className="px-8 py-5">
                  <Collection />
                </div>
              </main>
            </div>
            <BottomBar />
          </>} />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      }
    </>
  );
}

export default App;


// <Routes>
//   <Route path="/login" element={<Login />} />
//   <Route path="/register" element={<Register />} />
//   <Route path="/forgot" element={<Forgot />} />
//   <Route path="/" element={<>
//     <div className="wrapper">
//       <Sidebar />
//       <Content />
//     </div>
//     <BottomBar />
//   </>} />
// </Routes>