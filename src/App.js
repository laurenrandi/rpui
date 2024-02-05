import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileEditor from "./Pages/ProfileEditor/ProfileEditor";
import Landing from "./Pages/Landing/Landing";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import LoginSuccess from "./Pages/LoginSuccess/LoginSuccess";
import Layout from "./Pages/Layout/Layout";
import { ThemeProvider, createTheme } from "@mui/material";

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
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/login/success" element={<LoginSuccess />} />
            {/* <Route path="/profiles" */}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
