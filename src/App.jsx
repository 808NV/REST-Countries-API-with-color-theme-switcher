import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import "./App.css";
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Countries />} />
      <Route path="/:name" element={<CountryDetails />} />
    </Route>
  )
);

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app" id={theme ? "dark" : ""}>
        <RouterProvider router={router} />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
