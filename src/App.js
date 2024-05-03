import { ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoadingContext from "./Lib/LoadingContext/LoadingContext";
import UserContext from "./Lib/UserContext/UserContext";
import Landing from "./Pages/Landing/Landing";
import Layout from "./Pages/Layout/Layout";
import LoginSuccess from "./Pages/LoginSuccess/LoginSuccess";
import LogoutSuccess from "./Pages/LogoutSuccess/LogoutSuccess";
import ProfileEditor from "./Pages/ProfileEditor/ProfileEditor";
import Profiles from "./Pages/Profiles/Profiles";
import Users from "./Pages/Users/Users";

//fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { TourProvider } from "@reactour/tour";
import { SnackbarProvider } from "notistack";

import React from 'react';
import { DarkModeProvider, useDarkMode } from "./Lib/DarkModeContext/DarkModeContext";

import { CssBaseline, GlobalStyles } from "@mui/material";

const AppContent = () => {
  return (
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  );
};

function App() {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const userValue = { user, setUser };
  const loadingValue = { loading, setLoading };

  const { darkMode } = useDarkMode();

  const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005799',
    },
    secondary: {
      main: '#de0909',
    },
    elementBackground: {
      main: '#f2f2f2',
    },
    applicationBackground:{
      main: 'rgba(0, 0, 0, 0.08)',
    },
    golden: {
      main: '#E5BA39'
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#cddbe7',
    },
    secondary: {
      main: '#de0909',
    },
    elementBackground: {
      main: '#383838',
    },
    applicationBackground:{
      main: '#212121',
    },
    golden: {
      main: '#E5BA39'
    }
  }
});

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

const theme = darkMode ? darkTheme : lightTheme;

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <GlobalStyles
          styles={{
            body: { backgroundColor: "applicationBackground.main" },
          }}
        />
      <UserContext.Provider value={userValue}>
        <LoadingContext.Provider value={loadingValue}>
          <TourProvider 
            steps={[]} 
            showBadge={false} 
            showCloseButton={false} 
            afterOpen={() => {document.body.style.overflow = "hidden"}}
            beforeClose={() => {document.body.style.overflow = "auto"}}
            styles={{
              popover: (base) => ({
                ...base,
                fontFamily: theme.typography.fontFamily,
                textAlign: 'center'
              })
          }}>
            <SnackbarProvider
              style={{
                fontFamily: theme.typography.fontFamily
              }}
            >
              <RouterProvider router={router} />
            </SnackbarProvider>
          </TourProvider>
        </LoadingContext.Provider>
      </UserContext.Provider>
      </ThemeProvider>
  );
}

export default AppContent;
