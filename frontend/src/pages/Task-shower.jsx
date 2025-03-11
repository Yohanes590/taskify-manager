import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaWindowClose, FaRecycle } from "react-icons/fa";
import { useState } from "react";
function TaskShower() {
    const [openEditor, setEditor] = useState(true)


    const OpenEditor = () => {
        if (openEditor == true) {
            setEditor(false)
            document.getElementById("editor").style.display = "flex"
        } else {
            setEditor(true)
            document.getElementById("editor").style.display = "none"
        }
    }
    return (<>

        <div id="editor" className="fixed z-30 w-[100%] h-[100%] bg-[#00000085] items-center justify-center hidden">
            <div className="w-[80%] h-[90%] mt-[90px] lg:w-[25%] lg:h-[75%] bg-[#252525] flex items-center justify-center border-green-300 border-b-5 rounded-[10px]">
                <div className="">
                    <h1 className="text-[30px] font-bold text-center">Edit Task</h1><br />
                    <input type="text" placeholder="Task Name" className="bg-[#1f1f1f] border-2 border-green-300 rounded-[8px] outline-0 pl-[15px] h-[50px] w-[270px]" /><br />

                    <select
                        type="text" placeholder="Task Name" className="border-2 bg-green-300 text-black border-green-300 rounded-[8px] outline-0 pl-[15px] h-[50px] w-[270px] mt-[15px]" >
                        <option value="">High</option>
                        <option value="">Medium</option>
                        <option value="">Low</option>
                    </select><br /><br />
                    <input type="date" className="bg-[#1f1f1f] border-2 border-green-300 rounded-[8px] outline-0 pl-[15px] h-[50px] w-[270px]" /><br /><br />
                    <textarea placeholder="Discription" className="bg-[#1f1f1f] border-2 pt-[10px]  border-green-300 rounded-[8px] outline-0 pl-[15px] h-[130px] w-[270px]"></textarea><br />
                    <select
                        type="text" placeholder="Task Name" className="border-2 bg-green-300 text-black border-green-300 rounded-[8px] outline-0 pl-[15px] h-[50px] w-[270px] mt-[15px]" >
                        <option value="">Complated</option>
                        <option value="">Incomplate</option>
                    </select><br /><br />
                    <button className="w-[270px] bg-orange-400 h-[40px] cursor-pointer rounded-[10px] flex items-center justify-center">Update &nbsp;&nbsp;<FaRecycle /></button>
                    <button className="w-[270px] mt-[10px]  bg-red-500 h-[40px] cursor-pointer rounded-[10px] flex items-center justify-center" onClick={OpenEditor}>Cancel&nbsp;&nbsp; <FaWindowClose /></button>

                </div>
            </div>
        </div>
        <div id="task-show" className="mt-[100px]  w-full pl-0 transition-all duration-600 md:pl-[280px] h-[90%] absolute -z-10 flex flex-wrap pt-[15px] justify-evenly ">


            <div className="w-[90%] h-[400px] md:w-[400px] md:h-[350px]  overflow-hidden pl-[25px] mt-[20px] pt-[20px] bg-[#202020] rounded-[15px] border-amber-50 border-[0.5px]">
                <h1 className="text-[30px] font-bold">Task Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit molestias sit culpa repellat perspiciatis tenetur
                    est, quas maxime perferendis ab voluptatibus ratione dolorem?
                    Itaque animi praesentium pariatur vitae illum atque?</p><br />
                <p>12/02/2025</p>
                <p className="text-red-400">High</p>
                <div className="pt-[7px] flex justify-between">

                    <div className="bg-green-600 pl-[20px] h-[30px] items-center flex w-[120px] rounded-[20px]">Complated</div>
                    <div className="flex text-[22px]">
                        <FiEdit className="mr-[20px] cursor-pointer text-yellow-400 " onClick={OpenEditor} /><MdDelete className="mr-[10px] cursor-pointer text-red-400" />
                    </div>
                </div>
            </div>



            <div className="w-[90%] h-[400px] md:w-[400px] md:h-[350px]  overflow-hidden pl-[25px] mt-[20px] pt-[20px] bg-[#202020] rounded-[15px] border-amber-50 border-[0.5px]">
                <h1 className="text-[30px] font-bold">Task Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit molestias sit culpa repellat perspiciatis tenetur
                    est, quas maxime perferendis ab voluptatibus ratione dolorem?
                    Itaque animi praesentium pariatur vitae illum atque?</p><br />
                <p>12/02/2025</p>
                <p className="text-yellow-400">Medium</p>
                <div className="pt-[7px] flex justify-between">

                    <div className="bg-orange-600 pl-[20px] h-[30px] items-center flex w-[130px] rounded-[20px]">InComplated</div>
                    <div className="flex text-[22px]">
                        <FiEdit className="mr-[20px] cursor-pointer text-yellow-400 " onClick={OpenEditor} /><MdDelete className="mr-[10px] cursor-pointer text-red-400" />
                    </div>
                </div>
            </div>




            <div className="w-[90%] h-[400px] md:w-[400px] md:h-[350px]  overflow-hidden pl-[25px] mt-[20px] pt-[20px] bg-[#202020] rounded-[15px] border-amber-50 border-[0.5px]">
                <h1 className="text-[30px] font-bold">Task Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit molestias sit culpa repellat perspiciatis tenetur
                    est, quas maxime perferendis ab voluptatibus ratione dolorem?
                    Itaque animi praesentium pariatur vitae illum atque?</p><br />
                <p>12/02/2025</p>
                <p className="text-red-400">High</p>
                <div className="pt-[7px] flex justify-between">

                    <div className="bg-green-600 pl-[20px] h-[30px] items-center flex w-[120px] rounded-[20px]">Complated</div>
                    <div className="flex text-[22px]">
                        <FiEdit className="mr-[20px] cursor-pointer text-yellow-400 " onClick={OpenEditor} /><MdDelete className="mr-[10px] cursor-pointer text-red-400" />
                    </div>
                </div>
            </div>



            <div className="w-[90%] h-[400px] md:w-[400px] md:h-[350px]  overflow-hidden pl-[25px] mt-[20px] pt-[20px] bg-[#202020] rounded-[15px] border-amber-50 border-[0.5px]">
                <h1 className="text-[30px] font-bold">Task Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit molestias sit culpa repellat perspiciatis tenetur
                    est, quas maxime perferendis ab voluptatibus ratione dolorem?
                    Itaque animi praesentium pariatur vitae illum atque?</p><br />
                <p>12/02/2025</p>
                <p className="text-red-400">High</p>
                <div className="pt-[7px] flex justify-between">

                    <div className="bg-green-600 pl-[20px] h-[30px] items-center flex w-[120px] rounded-[20px]">Complated</div>
                    <div className="flex text-[22px]">
                        <FiEdit className="mr-[20px] cursor-pointer text-yellow-400 " onClick={OpenEditor} /><MdDelete className="mr-[10px] cursor-pointer text-red-400" />
                    </div>
                </div>
            </div>




            <div className="w-[90%] h-[400px] md:w-[400px] md:h-[350px]  overflow-hidden pl-[25px] mt-[20px] pt-[20px] bg-[#202020] rounded-[15px] border-amber-50 border-[0.5px]">
                <h1 className="text-[30px] font-bold">Task Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit molestias sit culpa repellat perspiciatis tenetur
                    est, quas maxime perferendis ab voluptatibus ratione dolorem?
                    Itaque animi praesentium pariatur vitae illum atque?</p><br />
                <p>12/02/2025</p>
                <p className="text-yellow-400">Medium</p>
                <div className="pt-[7px] flex justify-between">

                    <div className="bg-orange-600 pl-[20px] h-[30px] items-center flex w-[130px] rounded-[20px]">InComplated</div>
                    <div className="flex text-[22px]">
                        <FiEdit className="mr-[20px] cursor-pointer text-yellow-400 " onClick={OpenEditor} /><MdDelete className="mr-[10px] cursor-pointer text-red-400" />
                    </div>
                </div>
            </div>



            <div className="w-[90%] h-[400px] md:w-[400px] md:h-[350px]  overflow-hidden pl-[25px] mt-[20px] pt-[20px] bg-[#202020] rounded-[15px] border-amber-50 border-[0.5px]">
                <h1 className="text-[30px] font-bold">Task Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit molestias sit culpa repellat perspiciatis tenetur
                    est, quas maxime perferendis ab voluptatibus ratione dolorem?
                    Itaque animi praesentium pariatur vitae illum atque?</p><br />
                <p>12/02/2025</p>
                <p className="text-green-400">low</p>
                <div className="pt-[7px] flex justify-between">

                    <div className="bg-orange-600 pl-[20px] h-[30px] items-center flex w-[130px] rounded-[20px]">InComplated</div>
                    <div className="flex text-[22px]">
                        <FiEdit className="mr-[20px] cursor-pointer text-yellow-400 " onClick={OpenEditor} /><MdDelete className="mr-[10px] cursor-pointer text-red-400" />
                    </div>
                </div>
            </div>





        </div>

    </>)
}

export default TaskShower