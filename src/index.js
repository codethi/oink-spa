import ReactDOM from "react-dom";
import App from "./components/App";
import AuthProvider from "./Contexts/AuthContext";
import LoadProvider from "./Contexts/LoadContext";

ReactDOM.render(
  <AuthProvider>
    <LoadProvider>
      <App />
    </LoadProvider>
  </AuthProvider>,
  document.querySelector(".root")
);
