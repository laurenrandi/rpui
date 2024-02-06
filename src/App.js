import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileEditor from "./Pages/ProfileEditor/ProfileEditor";
import Landing from "./Pages/Landing/Landing";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import LoginSuccess from "./Pages/LoginSuccess/LoginSuccess";
import Layout from "./Pages/Layout/Layout";
import { ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import UserContext from "./Lib/UserContext/UserContext";
import Profiles from "./Pages/Profiles/Profiles";
import Documents from "./Pages/Documents/Documents";
import Users from "./Pages/Users/Users";
import LogoutSuccess from "./Pages/LogoutSuccess/LogoutSuccess";

const theme = createTheme({
  palette: {
    primary: {
      main: '#005799',
    },
    secondary: {
      main: '#a32828',
    },
    elementBackground: {
      main: '#f2f2f2'
    }
  }
});

function App() {
  const [user, setUser] = useState({});
  const userValue = { user, setUser };

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={userValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Landing />} />
              <Route path='/logout/success' element={<LogoutSuccess />} />
              <Route path="/login/success/:userId" element={<LoginSuccess />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
