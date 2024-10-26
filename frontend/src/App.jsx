import { Routes, Route, Outlet } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { ProjectProvider } from "./context/ProjectContext";
import { TareaProvider } from "./context/TareaContext";
import { AreaProvider } from "./context/AreaContext";
import { PuestoProvider } from "./context/PuestoContext";
import { UsuarioProvider } from "./context/UsuarioContext";



import Navbar from "./components/navbar/Navbar";
import { Container } from "./components/ui";
import { ProtectedRoute } from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

import ProjectPage from "./pages/ProjectPage";
import ProjectFormPage from "./pages/ProjectFormPage";
import TareaFormPage from "./pages/TareaFormPage";
import TareasPage from "./pages/TareasPage";
import AreasPage from "./pages/AreasPage";
import AreaFormPage from "./pages/AreaFormPage";

import SeguimientosPage from "./pages/SeguimientosPage";
import SegFormPage from "./pages/SegFormPage";
import PuestosPage from "./pages/PuestosPage";
import PuestoFormPage from "./pages/PuestoFormPage";
import UsuariosPage from "./pages/UsuariosPage";
import UsuarioFormPage from "./pages/UsuarioFormPage";






//Rutas para projects

function App() {
  const { isAuth, loading, user} = useAuth();
  console.log(loading)

  if (loading) return <h1>
    Cargando...
  </h1>

  
  return (
    <>
      <Navbar />
      <Container className="py-10">
        <Routes>
          <Route
            element={<ProtectedRoute isAllowed={!isAuth} redirectTo="/" />}
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        
          <Route
            element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}
          >
            <Route
              element={
                <TaskProvider>
                  <Outlet />
                </TaskProvider>
              }
            >
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/new" element={<TaskFormPage />} />
              <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
              
            </Route>

            <Route
              element={
                <ProjectProvider>
                  <Outlet />
                </ProjectProvider>
              }
            >
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/projects/new" element={<ProjectFormPage />} />
              <Route path="/projects/:id/edit" element={<ProjectFormPage />} />
            </Route>  
            
            <Route
              element={
                <TareaProvider>
                  <Outlet />
                </TareaProvider>
              }
            >
              <Route path="/tareas" element={<TareasPage />} />
              <Route path="/tareas/tareas_proyecto/:id_proyecto" element={<TareasPage />} />
              <Route path="/tareas/new" element={<TareaFormPage />} />
              <Route path="/tareas/:id_tarea/edit" element={<TareaFormPage />} />
              <Route path="/tareas/seguimientos/:id_tarea" element={<SeguimientosPage />} />  
              <Route path="/tareas/seguimiento/:id/edit" element={<SegFormPage />} />
              <Route path="/tareas/seguimientos/new" element={<SegFormPage />} />
              
            </Route> 

            <Route
              element={
                <AreaProvider>
                  <Outlet />
                </AreaProvider>
              }
            >
              <Route path="/areas" element={<AreasPage />} />
              <Route path="/areas/new" element={<AreaFormPage />} />
              <Route path="/areas/:id_area/edit" element={<AreaFormPage />} />
            </Route> 

            <Route
              element={
                <PuestoProvider>
                  <Outlet />
                </PuestoProvider>
              }
            >
              <Route path="/puestos" element={<PuestosPage/>} />
              <Route path="/puestos/new" element={<PuestoFormPage />} />
              <Route path="/puestos/:id_puesto/edit" element={<PuestoFormPage />} />
            </Route> 
            
            <Route
              element={
                <UsuarioProvider>
                  <Outlet />
                </UsuarioProvider>
              }
            >
              <Route path="/usuarios" element={<UsuariosPage/>} />
              <Route path="/usuarios/:id/edit" element={<UsuarioFormPage />} />
            </Route> 
            

            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<NotFound />} />

        </Routes>
        
      </Container>
      
    </>
  );
}

export default App;
