import { MdOutlineAddTask } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ApiLink } from "./api-link";
import Cookies from 'js-cookie'
function Anliytics() {
    const [getData, setData] = useState(0)
    const [allTask, setAllTask] = useState(0)
    const [icomTask, setInTask] = useState(0)
    useEffect(() => {
        async function GetDataAccess() {
            const auth_token = Cookies.get("auth_token")
            const FetchFunction = await fetch(ApiLink + 'task-showing', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_auth: auth_token
                })
            })
            const ChangeFunction = await FetchFunction.json()
            const incompateTask = ChangeFunction.filter(task => task.taskStatus != "complate")
            const complateTask = ChangeFunction.filter(task => task.taskStatus != "incomplate")
            document.getElementById("CompaltedTask").innerText = complateTask.length;
            document.getElementById("incomp-task").innerText = incompateTask.length;

            setData(complateTask.length)
            setAllTask(ChangeFunction.length)
            setInTask(incompateTask.length)
        }
        GetDataAccess()
    }, [])
    return (<>
        <div id="task-show" className="mt-[100px]  w-full pl-0 transition-all duration-600 md:pl-[280px] h-[90%] absolute -z-10 flex flex-wrap justify-evenly pt-[15px] items-center ">
            <div className="w-[450px] h-[240px] rounded-[10px]  shadow-green-500 shadow-[0_0_7px_2px] bg-[#3f3f3f] pl-[20px] pt-[20px] border-b-lime-400 border-b-8">
                <h1 className="font-bold text-[20px] flex items-center bg-green-500 w-[220px] pl-[10px] h-[40px] rounded-[10px] text-black">InComplated Task &nbsp;<MdOutlineAddTask /></h1>
                <h1 id="CompaltedTask" className="font-bold text-[35px]"></h1>
                <progress className="w-[90%] " max={allTask} value={getData}></progress>
                <p>You Achive Those Task</p>
                <button className="bg-green-600 mt-[10px] w-[200px] h-[40px] cursor-pointer rounded-[7px]" onClick={() => window.location.href = "/task"}>Show Task's </button>
            </div>
            <div id="in-complate" className="w-[450px] shadow-yellow-500 shadow-[0_0_7px_2px] rounded-[10px] h-[240px] bg-[#3f3f3f] pl-[20px] pt-[20px] border-b-lime-400 border-b-8">
                <h1 className="font-bold text-[20px] flex items-center bg-yellow-500 w-[220px] pl-[10px] h-[40px] rounded-[10px] text-black">InComplated Task &nbsp;<FaExclamationTriangle /></h1>
                <h1 id="incomp-task" className="font-bold text-[35px]"></h1>
                <progress className="w-[90%] " max={allTask} value={icomTask}></progress>
                <p>Un Complated Task. Please Complate Those</p>
                <button className="bg-violet-500 mt-[10px] w-[200px] h-[40px] cursor-pointer rounded-[7px]" onClick={() => window.location.href = "/incomplated-task"}>Complate Task </button>
            </div>
        </div>

    </>)
}
export default Anliytics