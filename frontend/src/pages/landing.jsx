import Landing from '../assets/Landing Task.svg'
function LandingPage() {
    return (<>

        <div className="w-[100%] h-[60px] bg-transparent backdrop-blur-2xl flex items-center justify-around fixed">
            <div >
                <h1 className="text-[25px] font-bold">Task<span className="text-lime-500">ify</span></h1>
            </div>
            <div>
                <button className="ml-[20px] bg-violet-500 w-[90px] cursor-pointer h-[35px] rounded-[7px]" onClick={() => { window.location.href = "/login" }}>Login</button>
                <button className="ml-[20px] bg-lime-600 w-[120px] cursor-pointer h-[35px] rounded-[7px]" onClick={() => { window.location.href = "/sign-up" }}>Register</button>
            </div>
        </div>



        <div className="flex items-center pt-[150px] xl:pt-[0px] text-center transition-all duration-600 xl:text-left justify-evenly w-[100%] h-screen flex-wrap">

            <div className=''>
                <h1 className="text-[40px] font-bold">Taskify Manager</h1>
                <h3 className="text-[30px] font-bold">Effortless Task Management</h3><br />
                <hr /><br />
                <h3 className="text-[15px] w-[100%] md:w-[700px]">Stay organized with an intuitive task management system that lets you create, edit, and track tasks effortlessly. Whether you're managing a personal to-do list or collaborating on a team project, Taskify simplifies the process to keep you productive..</h3>
                <button className="mt-[15px] w-[250px] h-[40px] bg-lime-700 cursor-pointer rounded-[7px]">Explore Now</button>
            </div>


            <div className='ml-[50px]'>
                <img src={Landing} className='w-[300px] lg:w-[550px]' />
            </div>

        </div>


    </>)
}

export default LandingPage