function ForoFor() {
    return (<>

        <div className="flex justify-center items-center w-[100%] h-screen">
            <div className="text-center bg-[#222222] w-[70%] h-[350px] rounded-[10px]">
                <h1 className="text-[100px] font-bold">4<span className="text-lime-400">0</span>4</h1>
                <p className="text-[30px]">OPPS! PAGE NOT FOUND</p>
                <p className="text-[20px]">Sorry, the page you're looking for dosen't exist.If you think <br />
                    something is braken report problem
                </p>
                <button className="w-[200px] h-[40px] bg-lime-600 mt-[20px] cursor-pointer rounded-[7px]" onClick={() => window.location.href = "/"}>RETURN HOME</button>
            </div>
        </div>

    </>)
}

export default ForoFor