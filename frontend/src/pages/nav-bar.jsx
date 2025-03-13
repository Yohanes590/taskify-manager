import { FaRegUserCircle } from "react-icons/fa";
import { useState } from 'react';
import { ApiLink } from "./api-link";
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
const TopNavBar = () => {
    const SendUserAuth = async () => {
        const TOKEN = Cookies.get("auth_token")
        const ServerResponce = await fetch(ApiLink + "verifey-user", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ USER_TOKEN: TOKEN })
        })
        const ChangeResponce = await ServerResponce.json()
        if (ChangeResponce.status == 200) {
            setTimeout(() => {
                document.getElementById("name-display").innerText = ChangeResponce.verifey_token.userInfo.user_name;
                document.getElementById("email-display").innerText = ChangeResponce.verifey_token.userInfo.user_email;
                document.getElementById("user-name-input").value = ChangeResponce.verifey_token.userInfo.user_name;
                document.getElementById("user-email-input").value = ChangeResponce.verifey_token.userInfo.user_email;
            }, 200);
        } else {
            Cookies.remove("auth_token")
            toast.error("Login Your Account", { position: "top-center" })
            window.location.href = "/"
        }
    }
    SendUserAuth()
    const [profile, setProfile] = useState(true)
    const OpenEditor = () => {
        if (profile == true) {
            setProfile(false)
            document.getElementById("profile-editor").style.display = "flex"
        } else {
            setProfile(true)
            document.getElementById("profile-editor").style.display = "none"
        }
    }
    return (<>
        <ToastContainer />
        <div id='profile-editor' className='w-full h-full fixed z-40 bg-[#0000006e] hidden justify-center items-center'>
            <div className='w-[700px] h-[500px] bg-[#202020] rounded-[10px] border-b-8 border-b-lime-400'>
                <div className='pl-[40px] pt-[40px]'>
                    <div className='flex items-center'>
                        <FaRegUserCircle size={50} />
                        <div>
                            <h2 className='pl-[15px] font-bold text-[20px]' id="name-display"></h2>
                            <h2 className='pl-[15px] text-[17px]' id="email-display"></h2>
                        </div>
                    </div>
                    <div className='mt-[20px]'>
                        <input type="file" id='profile-input' className='hidden' accept="image/*" />
                    </div>
                    <div className='mt-[20px]'>
                        <div className='mb-[15px]'>
                            <h1 className='font-bold text-[25px]'>Detail <span className='text-lime-400'>Information</span></h1>
                        </div>

                        <div className='mt-[40px]'>
                            <input type="text" id="user-name-input" placeholder='Your Name' className='w-[70%] h-[40px] outline-0 border-lime-400 border-2 pl-[20px] rounded-[6px]' /><br />
                            <input type="email" id="user-email-input" placeholder='Email' className='w-[70%] h-[40px] outline-0 border-lime-400 border-2 pl-[20px] rounded-[6px] mt-[10px]' /><br />
                            <input type="password" placeholder='Change password' className='w-[70%] h-[40px] outline-0 border-lime-400 border-2 pl-[20px] rounded-[6px] mt-[10px]' /><br />
                            <button className='mt-[10px] w-[48%] bg-green-700 h-[40px] cursor-pointer rounded-[7px]'>Save Changes</button>
                            <button onClick={OpenEditor} className='mt-[10px] w-[20%] bg-orange-500 h-[40px] cursor-pointer rounded-[7px] ml-[10px]'>Cancel</button>
                            <br /> <button className="w-[70%] mt-[20px] h-[40px] rounded-[10px] cursor-pointer bg-red-500">Delete Account</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div className="w-full h-[60px] flex fixed z-50 justify-around items-center bg-gray-900">
            <div className='flex items-center'>
                <h1 className="text-[25px] font-bold">Taskify <span className='text-lime-400'>Manager</span></h1>
            </div>
            <div onClick={OpenEditor} className="w-[50px] h-[50px] overflow-hidden rounded-[50%] cursor-pointer">
                <FaRegUserCircle size={40} />
            </div>
        </div>
    </>)
}
export default TopNavBar