import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "../globalStyles";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import Singin from "./Singin/Singin";
import Singup from "./Singup/Singup";
import RefreshProvider from "../Contexts/RefreshContext";
import PageNotFound from "../Pages/PageNotFound/PageNotFound";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <RefreshProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/singup" element={<Singup />} />
            <Route path="/singin" element={<Singin />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </RefreshProvider>
    </>
  );
}
