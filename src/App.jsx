import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
// import { auth, db } from "./firebase/config";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

// console.log(auth);
// console.log(db);

export default App;
