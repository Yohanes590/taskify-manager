import { MdDelete } from "react-icons/md";
function ComplatedTask() {
    return (<>
        <div id="task-show" className="mt-[100px]  w-full pl-0 transition-all duration-600 md:pl-[280px] h-[90%] absolute -z-10 flex flex-wrap pt-[15px] justify-evenly ">


            <div className="w-[90%] h-[400px] md:w-[400px] md:h-[350px]  overflow-hidden pl-[25px] mt-[20px] pt-[20px] bg-[#202020] rounded-[15px] border-amber-50 border-[0.5px]">
                <h1 className="text-[30px] font-bold">Task Title</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Impedit molestias sit culpa repellat perspiciatis tenetur
                    est, quas maxime perferendis ab voluptatibus ratione dolorem?
                    Itaque animi praesentium pariatur vitae illum atque?</p><br />
                <p>12/02/2025</p>
                <p className="text-yellow-400">Medium</p>
                <div className="pt-[7px] flex justify-between">

                    <div className="bg-green-600 pl-[20px] h-[30px] items-center flex w-[130px] rounded-[20px]">Complated</div>
                    <div className="flex text-[22px]">
                        <MdDelete className="mr-[10px] cursor-pointer text-red-400" />
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

                    <div className="bg-green-600 pl-[20px] h-[30px] items-center flex w-[130px] rounded-[20px]">Complated</div>
                    <div className="flex text-[22px]">
                        <MdDelete className="mr-[10px] cursor-pointer text-red-400" />
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

                    <div className="bg-green-600 pl-[20px] h-[30px] items-center flex w-[130px] rounded-[20px]">Complated</div>
                    <div className="flex text-[22px]">
                        <MdDelete className="mr-[10px] cursor-pointer text-red-400" />
                    </div>
                </div>
            </div>

        </div>
    </>)
}

export default ComplatedTask