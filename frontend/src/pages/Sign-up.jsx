import { IoMdLogIn } from "react-icons/io";
import { ApiLink } from './api-link'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie'
const SignUp = () => {

    var sendInformation = async () => {
        const Username = document.getElementById("userName").value;
        const Useremail = document.getElementById("userEmail").value;
        const UserPassword = document.getElementById("userPassword").value;
        const empty = ""
        if (Username == empty) {
            toast.warning("Invalid Username", { position: "top-center" })
        } else if (Useremail == empty) {
            toast.warning("Invalid Email", { position: "top-center" })
        } else if (UserPassword == empty) {
            toast.warning("Invalid Password", { position: "top-center" })
        } else if (UserPassword.length < 8) {
        } else {
            const UserObject = {
                user_name: Username,
                user_email: Useremail,
                user_password: UserPassword
            }
            const serverResponce = await fetch(ApiLink + `register-taskify`, {
                method: 'Post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(UserObject)
            })
            const changeResponce = await serverResponce.json()
            console.log(changeResponce.message)
            if (changeResponce.message == 200) {
                toast.success("Register success", { position: "top-center" })
                window.location.href = '/task'
                Cookies.set("auth_token", changeResponce.token)
            } else if (changeResponce.message == 400) {
                toast.warning("Already Register Account", { position: "top-center" })
                setTimeout(() => {
                    window.location.href = '/login'
                }, 3000);
            } else if (changeResponce.message == 500) {
                toast.warning("Internal Server Error", { position: "top-center" })
                window.location.reload()
            }
        }

    }
    return (<>
        <ToastContainer />
        <div className="flex items-center justify-center h-screen">
            <div className="bg-[#2e2e2e] w-[500px] h-[400px] pl-[20px] pt-[20px] rounded-[10px]">
                <div className="mt-[10px]">
                    <h1 className="text-[30px] font-bold">Register <span className="text-lime-400">Here!</span></h1>
                    <p className="text-[20px] ">Create Account Free Now</p>
                </div>
                <div className="mt-[20px]">
                    <input id="userName" className="w-[95%] h-[45px] border-b-lime-400 border-b-2 pl-[20px] bg-[#272727] outline-0" type="text" placeholder="Your Name" />
                    <input id="userEmail" className="w-[95%] h-[45px] border-b-lime-400 border-b-2 pl-[20px] bg-[#272727] outline-0 mt-[15px]" type="email" placeholder="Email" />
                    <input id="userPassword" className="w-[95%] h-[45px] border-b-lime-400 border-b-2 pl-[20px] bg-[#272727] outline-0 mt-[15px]" type="password" placeholder="Password" />
                    <label className="w-[95%] mt-[10px] cursor-pointer justify-center flex items-center h-[45px] bg-green-700 rounded-[7px]" onClick={sendInformation}>Register Now &nbsp; <IoMdLogIn size={20} /></label>
                    <p className="mt-[15px] text-center">I Have Account <a href="/login" className="text-lime-500">Login Now</a></p>
                </div>
            </div>
        </div>
    </>)
}

export default SignUp