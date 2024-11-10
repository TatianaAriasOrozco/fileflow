import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <div className="bg-gray-300 min-h-screen text-gray-700 p-5 flex flex-col gap-5 w-full justify-center mx-auto">
      <h2 className="text-3xl font-bold mx-auto">Welcome to FileFlow</h2>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
