import { MdDelete } from "react-icons/md";
import { ApiLink } from "./api-link";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { toast } from "react-toastify";
function ComplatedTask() {
    const [getInfo, setInfo] = useState([])
    useEffect(() => {
        const GetCompletTask = async () => {
            const ScannToken = Cookies.get("auth_token")
            const GetData = await fetch(ApiLink + 'task-showing', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_auth: ScannToken,
                })
            })
            const changeResult = await GetData.json()
            const FilterData = changeResult.filter(filterItem => filterItem.taskStatus === "complate")
            setInfo(FilterData)
        }
        GetCompletTask()
    }, [])
    async function deletingTask(titleParams) {
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
        <div id="task-show" className="mt-[100px]  w-full pl-0 transition-all duration-600 md:pl-[280px] h-[90%] absolute -z-10 flex flex-wrap pt-[15px] justify-evenly ">

            {getInfo.map((indexValue, index) => {
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
                                <MdDelete onClick={() => deletingTask(indexValue.task_title)} className="mr-[10px] cursor-pointer text-red-400" />
                            </div>
                        </div>
                    </div>
                )
            })}




        </div>
    </>)
}

export default ComplatedTask