import {MdTaskAlt} from 'react-icons/md'
import {BiTask, BiUserCircle} from 'react-icons/bi'
import { IoAccessibility } from "react-icons/io5";
import { GiShamblingZombie } from "react-icons/gi";

export const publicRoutes = [
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
]

export const privateRoutesPO = [
  
  {
    name: "Tareas",
    path: "/tareas",
    icon: <BiTask className='w-5 h-5' />,
  },

  {
    name: "Projects",
    path: "/projects",
    icon: <BiTask className='w-5 h-5' />,
  },
  
  {
    name: "areas",
    path: "/areas",
    icon: <BiTask className='w-5 h-5' />,
  },
  {
    name: "Puestos",
    path: "/puestos",
    icon: <GiShamblingZombie className='w-5 h-5' />,
  },
  {
    name: "Usuarios",
    path: "/usuarios",
    icon: <IoAccessibility className='w-5 h-5' />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <BiUserCircle className='w-5 h-5' />,
  },
  

];

export const adminRoutes =[
  {
    name: "areas",
    path: "/areas",
    icon: <BiTask className='w-5 h-5' />,
  },
  {
    name: "Puestos",
    path: "/puestos",
    icon: <GiShamblingZombie className='w-5 h-5' />,
  },
  {
    name: "Usuarios",
    path: "/usuarios",
    icon: <IoAccessibility className='w-5 h-5' />,
  },
  
]