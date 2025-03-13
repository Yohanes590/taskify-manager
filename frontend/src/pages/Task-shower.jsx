import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaWindowClose, FaRecycle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { ApiLink } from "./api-link";
import Cookies from "js-cookie"
import { toast } from "react-toastify";
function TaskShower() {
    const [openEditor, setEditor] = useState(true)
    const [taskVar, setTask] = useState([])
    const [idTask, setTaskId] = useState([])
    useEffect(() => {
        const ShowTaskAPi = async () => {
            const user_id = Cookies.get("auth_token")
            const FethingApi = await fetch(ApiLink + 'task-showing', {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    user_auth: user_id
                })
            })
            const changeResponceToJson = await FethingApi.json()
            setTask(changeResponceToJson)
        }
        ShowTaskAPi()
    }, [])

    const OpenEditor = async (taskProp) => {
        if (openEditor == true) {
            setEditor(false)
            document.getElementById("editor").style.display = "flex"
            document.getElementById("task-name").value = taskProp.task_title;
            document.getElementById("prio-display").value = taskProp.taskPrio;
            document.getElementById("date-dis").value = taskProp.taskDate;
            document.getElementById("disc-dispay").value = taskProp.taskDiscription;
            document.getElementById("status-dis").value = taskProp.taskStatus;
            setTaskId(taskProp)
        } else {
            setEditor(true)
            document.getElementById("editor").style.display = "none"
        }

    }

    const UpdateTask = async () => {
        const GettingToken = Cookies.get("auth_token")

        const task_name = document.getElementById("task-name").value;
        const task_prio = document.getElementById("prio-display").value;
        const task_date = document.getElementById("date-dis").value;
        const task_dis = document.getElementById("disc-dispay").value;
        const task_status = document.getElementById("status-dis").value;

        const UpdateDatabase = await fetch(ApiLink + 'updating-user-task', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task_title_id: idTask.task_title,
                auth_token: GettingToken,
                updatedTask: {
                    task_title: task_name,
                    taskDiscription: task_dis,
                    taskDate: task_date,
                    taskPrio: task_prio,
                    taskStatus: task_status
                }
            })
        })
        const changeIntoJson = await UpdateDatabase.json()
        console.log(changeIntoJson)
        if (changeIntoJson.message == 200) {
            toast.success("task updated!", { position: "top-center" })
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } else if (changeIntoJson.message == 500) {
            Cookies.remove("auth_token")
            toast.error("some thing error", { position: "top-center" })
            setTimeout(() => {
                window.location.href = "/"
            }, 1000);
        } else {
            Cookies.remove("auth_token")
            toast.error("internal server error", { position: "top-center" })
            window.location.href = "/"
        }
    }

    const deletingTask = async (titleParams) => {
        if (confirm("Are you sure to delete")) {
            const userAuth = Cookies.get("auth_token")
            const deleteingTask = await fetch(ApiLink + 'deleteing-task', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: userAuth,
                    task_title: titleParams
                })
            })
            const DeletingApi = await deleteingTask.json()
            if (DeletingApi.message == 200) {
                toast.success("Task delete Success", { position: "top-center" })
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } else {
                toast.error("some thing went wrong", { position: "top-center" })
                Cookies.remove("auth_token")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        } else {
            toast.warning("process canceled", { position: "top-center" })
        }
    }

    return (<>

        <div id="editor" className="fixed z-30 w-[100%] h-[100%] bg-[#00000085] items-center justify-center hidden">
            <div className="w-[80%] h-[90%] mt-[90px] lg:w-[25%] lg:h-[75%] bg-[#252525] flex items-center justify-center border-green-300 border-b-5 rounded-[10px]">
                <div className="">
                    <h1 className="text-[30px] font-bold text-center">Edit Task</h1><br />
                    <input id="task-name" type="text" placeholder="Task Name" className="bg-[#1f1f1f] border-2 border-green-300 rounded-[8px] outline-0 pl-[15px] h-[50px] w-[270px]" /><br />
                    <select
                        type="text" id="prio-display" placeholder="Task Name" className="border-2 bg-green-300 text-black border-green-300 rounded-[8px] outline-0 pl-[15px] h-[50px] w-[270px] mt-[15px]" >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select><br /><br />
                    <input type="date" id="date-dis" className="bg-[#1f1f1f] border-2 border-green-300 rounded-[8px] outline-0 pl-[15px] h-[50px] w-[270px]" /><br /><br />
                    <textarea id="disc-dispay" placeholder="Discription" className="bg-[#1f1f1f] border-2 pt-[10px]  border-green-300 rounded-[8px] outline-0 pl-[15px] h-[130px] w-[270px]"></textarea><br />
                    <select
                        type="text" id="status-dis" placeholder="Task Name" className="border-2 bg-green-300 text-black border-green-300 rounded-[8px] outline-0 pl-[15px] h-[50px] w-[270px] mt-[15px]" >
                        <option value="complate">Complated</option>
                        <option value="incomplate">Incomplate</option>
                    </select><br /><br />
                    <button className="w-[270px] bg-orange-400 h-[40px] cursor-pointer rounded-[10px] flex items-center justify-center" onClick={() => UpdateTask()}>Update &nbsp;&nbsp;<FaRecycle /></button>
                    <button className="w-[270px] mt-[10px]  bg-red-500 h-[40px] cursor-pointer rounded-[10px] flex items-center justify-center" onClick={OpenEditor}>Cancel&nbsp;&nbsp; <FaWindowClose /></button>

                </div>
            </div>
        </div>
        {/*  Loop task view */}
        <div id="task-show" className="mt-[100px]  w-full pl-0 transition-all duration-600 md:pl-[280px] h-[90%] absolute -z-10 flex flex-wrap pt-[15px] justify-evenly ">
            {taskVar.map((indexValue, index) => {
                return (
                    <div key={index} className="w-[90%] h-[400px] md:w-[400px] md:h-[350px]  overflow-y-scroll pl-[25px] mt-[20px] pt-[20px] bg-[#202020] rounded-[15px] border-amber-50 border-[0.5px]">
                        <h1 className="text-[30px] font-bold">{indexValue.task_title}</h1>
                        <p>{indexValue.taskDiscription}</p><br />
                        <p>{indexValue.taskDate}</p>
                        <p id="prio-shower" className="text-yellow-400">{
                            indexValue.taskPrio === "high" ? (<span className="text-red-400">High</span>) : indexValue.taskPrio === 'medium' ? (<span className="text-yellow-500">Medium</span>) : (<span className="text-green-500">Low</span>)}</p>
                        <div className="pt-[7px] flex justify-between">
                            <div>{
                                indexValue.taskStatus === "complate" ? (<div className="bg-green-500 pl-[20px] h-[30px] items-center flex w-[130px] rounded-[20px]">Complate</div>) : (<div className="bg-orange-500 pl-[20px] h-[30px] items-center flex w-[130px] rounded-[20px]">InComplate</div>)
                            }</div>
                            <div className="flex text-[22px]">
                                <FiEdit className="mr-[20px] cursor-pointer text-yellow-400 " onClick={() => OpenEditor(indexValue)} /><MdDelete onClick={() => deletingTask(indexValue.task_title)} className="mr-[10px] cursor-pointer text-red-400" />
                            </div>
                        </div>
                    </div>
                )
            })}


        </div>

    </>)
}

export default TaskShower