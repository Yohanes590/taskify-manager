import { FaHome, FaCheck, FaChartBar, FaExclamationTriangle } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { RiMenu2Line } from "react-icons/ri";
import { AiFillCloseSquare } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from 'js-cookie'
function SideBar() {
    const [open, setOpen] = useState(true)
    const [changeIcon, setIcon] = useState(<RiMenu2Line />)
    const OpenShuter = () => {
        if (open == true) {
            setOpen(false)
            setIcon(<AiFillCloseSquare />)
            document.getElementById("menu-bar").style.width = "270px"
            document.getElementById("display").style.marginLeft = "270px"
        } else {
            setOpen(true)
            setIcon(<RiMenu2Line />)
            document.getElementById("menu-bar").style.width = "0px"
            document.getElementById("display").style.marginLeft = "0px"
        }
    }
    var GetPath = window.location.pathname
    setTimeout(() => {
        const task = document.getElementById("Task")
        const anly = document.getElementById("Alny")
        const Addtask = document.getElementById("Addtask")
        const complate_task = document.getElementById("complate-task")
        const incomplate_task = document.getElementById("incomplate-task")
        if (GetPath == "/task") {
            task.style.borderLeft = "4px solid #9AE60C"
            task.style.background = "#1f2937"
        } else if (GetPath == "/anliytics") {
            anly.style.borderLeft = "4px solid #9AE60C"
            anly.style.background = "#1f2937"
        } else if (GetPath == "/add-task") {
            Addtask.style.borderLeft = "4px solid #9AE60C"
            Addtask.style.background = "#1f2937"
        } else if (GetPath == "/complated-task") {
            complate_task.style.borderLeft = "4px solid #9AE60C"
            complate_task.style.background = "#1f2937"
        } else if (GetPath == "/incomplated-task") {
            incomplate_task.style.borderLeft = "4px solid #9AE60C"
            incomplate_task.style.background = "#1f2937"
        }
    }, 100)

    const logout = () => {
        if (confirm("Are you sure logout")) {
            toast.warning("Logout Success", { position: "top-center" })
            setTimeout(() => {
                Cookies.remove("auth_token")
                window.location.href = "/"
            }, 1000);
        } else {
            toast.success("Process Cancel", { position: "top-center" })
        }
    }

    return (<>
        <div id="menu-bar" className="w-[0px] fixed z-40 md:w-[270px] h-screen bg-gray-900 grid items-center  overflow-hidden transition-all duration-600">

            <div className="w-full">
                <div id="Task" className="h-[45px] border-r-4 border-r-transparent hover:text-lime-400 hover:border-r-lime-400 pl-[20px] w-[100%] flex cursor-pointer transition-all duration-700 hover:bg-gray-700 items-center" onClick={() => window.location.href = "/task"}><FaHome /><p className="ml-[15px]">Task</p></div>
                <div id="Addtask" className="h-[45px] border-r-4 border-r-transparent hover:text-lime-400 hover:border-r-lime-400 pl-[20px] w-[100%] flex cursor-pointer transition-all duration-700 hover:bg-gray-700 items-center" onClick={() => window.location.href = "/add-task"}><IoIosAddCircle /><p className="ml-[15px]">Add Task</p></div>
                <div id="Alny" className="h-[45px] border-r-4 border-r-transparent hover:text-lime-400 hover:border-r-lime-400 pl-[20px] w-[100%] flex cursor-pointer transition-all duration-700 hover:bg-gray-700 items-center" onClick={() => window.location.href = "/anliytics"}><FaChartBar /><p className="ml-[15px]">Anliytics</p></div>
                <div id="complate-task" className="h-[45px] border-r-4 border-r-transparent hover:text-lime-400 hover:border-r-lime-400 pl-[20px] w-[100%] flex cursor-pointer transition-all duration-700 hover:bg-gray-700 items-center" onClick={() => window.location.href = "/complated-task"}><FaCheck /><p className="ml-[15px]">Completed</p></div>
                <div id="incomplate-task" className="h-[45px] border-r-4 border-r-transparent hover:text-lime-400 hover:border-r-lime-400 pl-[20px] w-[100%] flex cursor-pointer transition-all duration-700 hover:bg-gray-700 items-center" onClick={() => window.location.href = "/incomplated-task"}><FaExclamationTriangle /><p className="ml-[15px]">InComplate</p></div>
            </div>
            <div>
                <div className="h-[45px] border-l-4 border-l-transparent hover:text-red-400 hover:border-l-red-400 pl-[20px] w-[100%] flex cursor-pointer transition-all duration-700 hover:bg-gray-800 items-center" onClick={logout}><CiLogout /><p className="ml-[15px]">Logout</p></div>
            </div>
        </div>

        <div id="display" onClick={OpenShuter} className="fixed z-50 font-bold bg-lime-400 w-[50px] transition-all duration-600 md:w-[0px] h-[50px] mt-[97px] flex justify-center items-center text-[25px] text-black">
            {changeIcon}
        </div>

    </>)
}

export default SideBar