import { Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import LoginSuccess from "./Pages/LoginSuccess/LoginSuccess";
import Layout from "./Pages/Layout/Layout";
import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import UserContext from "./Lib/UserContext/UserContext";
import LoadingContext from "./Lib/LoadingContext/LoadingContext";
import Profiles from "./Pages/Profiles/Profiles";
//import Documents from "./Pages/Documents/Documents";
import Users from "./Pages/Users/Users";
import LogoutSuccess from "./Pages/LogoutSuccess/LogoutSuccess";
import ProfileEditor from "./Pages/ProfileEditor/ProfileEditor";

//fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { SnackbarProvider } from "notistack";

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
    },
    golden: {
      main: '#E5BA39'
    }
  }
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const userValue = { user, setUser };
  const loadingValue = { loading, setLoading };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='/logout/success' element={<LogoutSuccess />} />
          <Route path="/login/success/:userId" element={<LoginSuccess />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profiles/:profileId" element={<ProfileEditor />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={userValue}>
        <LoadingContext.Provider value={loadingValue}>
          <SnackbarProvider
            style={{
              fontFamily: theme.typography.fontFamily
            }}
          >
            <RouterProvider router={router} />
          </SnackbarProvider>
        </LoadingContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
