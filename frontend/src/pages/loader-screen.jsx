import './loader.css'
const LoaderScreen = () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none"
    }, 3000)
    return (<>
        <div id='loader' className='bg-[#000000b6] backdrop-blur-2xl w-full pl-0 transition-all duration-600 md:pl-[280px] h-screen fixed z-[10] flex flex-wrap pt-[15px] justify-evenly items-center'>
            <span class="loader"></span>
        </div>
    </>)
}
export default LoaderScreen