import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Appbar from "./components/Appbar";

import Footer from "./components/Footer";
import { ThemeProvider } from "@emotion/react";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import Auth from "./components/Auth";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { getCurrentSession } from "./services/session";
import UserContext from "./contexts/UserContext";
import { IUser } from "./interfaces/user";
import { createTheme } from "@mui/material";
import Home from "./components/Home";

Amplify.configure(awsconfig);


const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#052b6c",
    },
    secondary: {
      main: "#00baf2",
    },
  },
});

function App() {
  const [user, setUser] = useState<IUser | null>(null);

  const loadUser = async () => {
    try {
      let currentUser = await getCurrentSession();
      console.log("user=", currentUser);
      localStorage.setItem("user", "logged");
      setUser(currentUser);
    } catch (ex) {
      console.log("error", ex);
    }
  };

  useEffect(() => {
      loadUser();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserContext.Provider value={{ user }}>
            <Appbar user={user} setUser={setUser} />
            <div className="main">
              <Routes>
                <Route path="/" element={<Auth />} />
                <Route element={<ProtectedRoute redirectPath="/" />}>
                  <Route path="home" element={<Home />} />
                  <Route path="*" element={<h1>Not found</h1>} />
                </Route>
                <Route path="*" element={<h1>Not found</h1>} />
              </Routes>
            </div>
          </UserContext.Provider>

          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
