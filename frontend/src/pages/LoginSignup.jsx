import { useState } from "react";
import { auth } from "../firebase";
import axios from "axios"
import {useNavigate ,Link} from "react-router-dom"

import {  GoogleAuthProvider,signInWithPopup, createUserWithEmailAndPassword,signInWithEmailAndPassword,} from "firebase/auth";

const LoginSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    await sendTokenToBackend();
  };

  // Email Signup
  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    await sendTokenToBackend();
  };

  // Email Login
  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    await sendTokenToBackend();
  };

  // 🔐 Send Firebase ID Token to Backend
const sendTokenToBackend = async () => {
  try {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.get("http://localhost:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("token",token);
    navigate("/dashboard");

    console.log("Backend response:", res.data);
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
  }
};



  return (
    <div style={{ width: "300px", margin: "50px auto" }}>
      <h2>Login / Signup</h2>
      <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}  style={{ width: "100%", marginBottom: "10px" }}/>

      <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500" type="password" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", marginBottom: "10px" }}/>

      <button  className="w-full px-4 py-2 border rounded-lg text-indigo-600 font-medium hover:underline" onClick={handleLogin} style={{ width: "100%" }}>  Login </button>

      <button  className="w-full px-4 py-2 border rounded-lg text-indigo-600 font-medium hover:underline" onClick={handleSignup} style={{ width: "100%", marginTop: "5px" }}> Signup</button>

      <hr />
      <button  className="w-full px-4 py-2 border rounded-lg text-indigo-600 font-medium hover:underline" onClick={handleGoogleLogin} style={{ width: "100%" }}> Login with Google</button>

    </div>
  );
};

export default LoginSignup;
