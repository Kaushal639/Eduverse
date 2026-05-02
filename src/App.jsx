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
import Profile from './assets/components/profile/Profile.jsx';



function App() {

   const Router=createBrowserRouter([
      {
         path:"/",
         element:(<><Home /><Navbar /></>)
      },
      {
         path:"/courses",
         element:(<><Coursespage /><Navbar /></>)
      },

      {
         path:"/login",
         element:(<><Loginform /></>)
      },


      {
         path:"/login/signup",
         element:(<><Signupform /></>)
      },

      {
         path:"/about",
         element:(<><About /><Navbar /></>)
      },
      {
         path:"/contact",
         element:(<><Contact /><Navbar /></>)
      },

      {
         path:"/profile",
         element:(<><Profile /><Navbar /></>)
      },

      {
         path:"/enrolled",
         element:(<><EnrolledCourse /><Navbar /></>)
      },
      {
         path:"/admin",
         element:(<><AdminDashboard /></>)
      }

   ])
      

   return (<>
   <RouterProvider router={Router}></RouterProvider>
   </>)

}

export default App

