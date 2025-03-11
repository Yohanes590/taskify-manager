import { IoMdAddCircle } from "react-icons/io";
import { ApiLink } from "./api-link";
function AddTask() {
    const AddingTask = async () => {
        const AddToServer = await fetch(ApiLink + `add-task`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
        })
        const ChangedRequest = await AddToServer.json()
        console.log(ChangedRequest)
    }
    return (<>
        <div id="task-show" className="mt-[100px]  w-full pl-0 transition-all duration-600 md:pl-[280px] h-[90%] absolute -z-10 flex flex-wrap pt-[15px] justify-evenly ">
            <div className="w-[100%] mt-[50px]">
                <h1 className="mb-[10px] font-bold text-[18px]"> Task Title</h1>
                <input type="text" placeholder="eg make vides , study .." className="bg-[#111111] mb-[20px] pl-[20px] w-[80%]  h-[45px] outline-0  rounded-[7px]" /><br />
                <h1 className="mb-[1px] font-bold text-[18px]"> Task Discription</h1>
                <textarea type="text" placeholder="eg about making videos , study detail paln ..." className="bg-[#111111] mb-[20px] pl-[20px] w-[80%]  h-[145px] outline-0  rounded-[7px] mt-[10px] pt-[10px]" /><br />
                <h1 className="mb-[1px] font-bold text-[18px]"> Date</h1>
                <input type="date" className="bg-[#111111] rounded-[8px] outline-0 pl-[15px] h-[50px] w-[80%] " /><br /><br />
                <h1 className="mb-[10px] font-bold text-[18px]"> Priority</h1>
                <select
                    type="text" placeholder="Task Name" className="bg-[#111111] text-white rounded-[8px] outline-0 pl-[15px] h-[50px] w-[80%] " >
                    <option value="">High</option>
                    <option value="">Medium</option>
                    <option value="">Low</option>
                </select><br />
                <button onClick={AddingTask} className="mt-[20px] flex items-center cursor-pointer w-[80%]  bg-green-700 justify-center h-[40px] rounded-[7px]">Add Task &nbsp;<IoMdAddCircle /></button>
            </div>
        </div>
    </>)
}

export default AddTask