import Card from './assets/components/card/card.jsx' 
import Navbar from './assets/components/navbar/navbar.jsx'   
import Loginform from './assets/authentication/loginform.jsx'
import Signupform from './assets/components/signupform/signup.jsx'
import CourseCard from './assets/components/course-card/course-card.jsx'
import './App.css'
import Container from './assets/components/container/container.jsx'
import Coursespage from './assets/coursespage/course.jsx'
import Home from './assets/homepage/home.jsx'
import { createBrowserRouter} from 'react-router-dom'
  import { RouterProvider } from 'react-router-dom'
  import About from './assets/aboutpage/about.jsx'
import Contact from './assets/contact/contact.jsx'
import EnrolledCourse from './assets/course-enrolled/enrolled-course.jsx'
import AdminDashboard from './assets/admin/AdminDashboard.jsx'


function App() {

   const Router=createBrowserRouter([
      {
         path:"/",
         element:(<><Home></Home>,<Navbar></Navbar></>)
      },
      {
         path:"/courses",
         element:(<><Coursespage></Coursespage>,<Navbar></Navbar> </>)
      },
      {
         path:"/login",
         element:(<>
         <Loginform></Loginform></>)
      },
      {
         path:"/login/signup",
         element:(<><Signupform></Signupform></>)
      },
      {
         path:"/about",
         element:(<><About></About>,<Navbar></Navbar></>)
      },
      {
         path:"/contact",
         element:(<><Contact></Contact>,<Navbar></Navbar></>)
      },
      {
         path:"/profile",
         element:(<> <div>Profile Page</div>,<Navbar></Navbar></>)
      },
      {
         path:"/enrolled",
         element:(<> <EnrolledCourse></EnrolledCourse>,<Navbar></Navbar></>)
      },
      {
         path:"/admin",
         element:(<> <AdminDashboard></AdminDashboard>,<Navbar></Navbar></>)
      }

   ])
      

   return (<>
   <RouterProvider router={Router}></RouterProvider>
   </>)

}

export default App

