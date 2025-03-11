import { Route, Routes } from 'react-router-dom'
import TopNavBar from "./pages/nav-bar"
import SideBar from "./pages/side-bar"
import TaskShower from "./pages/Task-shower"
import Anliytics from './pages/anliytics'
import AddTask from './pages/add-task'
import ComplatedTask from './pages/complated'
import IncompateTask from './pages/incomplate.'
import LoaderScreen from './pages/loader-screen'
import SignUp from './pages/Sign-up'
import Login from './pages/login'
import ForoFor from './pages/404'
import LandingPage from './pages/landing'
function App() {
  return (<>
    <Routes>

      <Route path="/" element={<>
        <LandingPage />
      </>} />

      <Route path="/task" element={<>
        <LoaderScreen />
        <TopNavBar />
        <SideBar />
        <TaskShower />
      </>} />

      <Route path="/anliytics" element={<>
        <LoaderScreen />
        <TopNavBar />
        <SideBar />
        <Anliytics />
      </>} />

      <Route path="/add-task" element={<>
        <LoaderScreen />
        <TopNavBar />
        <SideBar />
        <AddTask />
      </>} />

      <Route path="/complated-task" element={<>
        <LoaderScreen />
        <TopNavBar />
        <SideBar />
        <ComplatedTask />
      </>} />

      <Route path="/incomplated-task" element={<>
        <LoaderScreen />
        <TopNavBar />
        <SideBar />
        <IncompateTask />
      </>} />

      <Route path="/sign-up" element={<>
        <SignUp />
      </>} />

      <Route path="/login" element={<>
        <Login />
      </>} />

      <Route path="/*" element={<>
        <ForoFor />
      </>} />

    </Routes>


  </>)
}
export default App