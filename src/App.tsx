import React, { useContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";

import "./App.css";
import { MainLayout } from "./layouts/MainLayout";
import { AnalisysPage } from "./pages/AnalisysPage/AnalisysPage";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { ClientPage } from "./pages/ClientPage/ClientPage";
import { ClientsPage } from "./pages/ClientsPage/ClientsPage";
import { CreateClientPage } from "./pages/CreateClientPage/CreateClientPage";
import { CreateProjectPage } from "./pages/CreateProjectPage/CreateProjectPage";
import { ProjectPage } from "./pages/ProjectPage/ProjectPage";
import { ProjectsPage } from "./pages/ProjectsPage/ProjectsPage";
import { Admin } from "./types/interfaces";

interface IAuthContext {
  isAuth: boolean;
  changeAuth: (auth: boolean) => void;
  user: Admin | null;
  setUser: (user: Admin | null) => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  isAuth: false,
  changeAuth: () => {},
  user: null,
  setUser: () => {},
});

function App() {
  const [isAuth, changeAuth] = useState(false);
  const [user, setUser] = useState<null | Admin>(null);

  const context = { isAuth, changeAuth, user, setUser } as IAuthContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/clients");
    } else {
      navigate("/auth");
    }
  }, [isAuth]);

  return (
    <AuthContext.Provider value={context}>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="*"
          element={
            <MainLayout>
              <Routes>
                <Route>
                  <Route path="/clients/:id" element={<ClientPage />} />
                  <Route path="/clients" element={<ClientsPage />} />
                  <Route
                    path="/clients/create"
                    element={<CreateClientPage />}
                  />
                </Route>
                <Route>
                  <Route path="/projects/:id" element={<ProjectPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route
                    path="/projects/create"
                    element={<CreateProjectPage />}
                  />
                </Route>
                <Route path="/analisys" element={<AnalisysPage />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
