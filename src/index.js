import ReactDOM from "react-dom";
import App from "./components/App";
import AuthProvider from "./Contexts/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.querySelector(".root")
);
