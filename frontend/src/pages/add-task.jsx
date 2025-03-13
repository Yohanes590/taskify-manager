import { IoMdAddCircle } from "react-icons/io";
import { ApiLink } from "./api-link";
import { toast, ToastContainer } from "react-toastify";
import Cookies from 'js-cookie'
function AddTask() {
    const AddingTask = async () => {
        const taskTitle = document.getElementById("task-title").value;
        const taskDiscription = document.getElementById("task-dis").value;
        const taskDate = document.getElementById("date").value;
        const prio = document.getElementById("pri").value;
        const status = document.getElementById("status").value;
        const cookieToken = Cookies.get("auth_token")
        const empty = ""
        if (taskTitle == empty) {
            toast.warning("Please insert title", { position: "top-center" })
        } else if (taskDiscription == empty) {
            toast.warning("Please insert discription", { position: "top-center" })
        } else if (taskDate == empty) {
            toast.warning("Please insert due date", { position: "top-center" })
        } else if (prio == empty) {
            toast.warning(prio, { position: "top-center" })
        } else if (status == empty) {
            toast.warning("Insert status", { position: "top-center" })
        } else if (cookieToken == null) {
            toast.warning("Login Again!!!", { position: "top-center" })
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } else {
            const taskInfo = {
                user_token: cookieToken,
                task_title: taskTitle,
                taskDiscription: taskDiscription,
                taskDate: taskDate,
                taskPrio: prio,
                taskStatus: status
            }
            const AddToServer = await fetch(ApiLink + `add-task`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskInfo)
            })
            const ChangedRequest = await AddToServer.json()
            if (ChangedRequest.message == 200) {
                toast.success("task add success!", { position: "top-center" })
                setTimeout(() => {
                    window.location.href = "/task"
                }, 1000);
            } else if (ChangedRequest.message == 500) {
                toast.error("internal server error", { position: "top-center" })
                Cookies.remove("auth_token")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        }

    }
    return (<>
        <div id="task-show" className="mt-[100px]  w-full pl-0 transition-all duration-600 md:pl-[280px] h-[90%] absolute -z-10 flex flex-wrap pt-[15px] justify-evenly ">
            <div className="w-[100%] mt-[50px]">
                <h1 className="mb-[10px] font-bold text-[18px]"> Task Title</h1>
                <input id="task-title" type="text" placeholder="eg make vides , study .." className="bg-[#111111] mb-[20px] pl-[20px] w-[80%]  h-[45px] outline-0  rounded-[7px]" /><br />
                <h1 className="mb-[1px] font-bold text-[18px]"> Task Discription</h1>
                <textarea id="task-dis" type="text" placeholder="eg about making videos , study detail paln ..." className="bg-[#111111] mb-[20px] pl-[20px] w-[80%]  h-[145px] outline-0  rounded-[7px] mt-[10px] pt-[10px]" /><br />
                <h1 className="mb-[1px] font-bold text-[18px]"> Date</h1>
                <input id="date" type="date" className="bg-[#111111] rounded-[8px] outline-0 pl-[15px] h-[50px] w-[80%] " /><br /><br />
                <h1 className="mb-[10px] font-bold text-[18px]"> Priority</h1>
                <select
                    id="pri" type="text" placeholder="Task Name" className="bg-[#111111] text-white rounded-[8px] outline-0 pl-[15px] h-[50px] w-[80%] " >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select><br />
                <br /><h1 className="mb-[10px] font-bold text-[18px]"> Status</h1>
                <select id="status"
                    type="text" placeholder="Task Name" className="bg-[#111111] mt-[7px] text-white rounded-[8px] outline-0 pl-[15px] h-[50px] w-[80%] " >
                    <option value="complate">Complate</option>
                    <option value="incomplate">InComplate</option>
                </select><br />
                <button onClick={AddingTask} className="mt-[20px] flex items-center cursor-pointer w-[80%]  bg-green-700 justify-center h-[40px] rounded-[7px]">Add Task &nbsp;<IoMdAddCircle /></button>
            </div>
        </div>
    </>)
}

export default AddTask