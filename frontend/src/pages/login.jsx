import { IoMdLogIn } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { ApiLink } from "./api-link";
import Cookies from 'js-cookie'
function Login() {
    const Login_into_account = async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if (email == "") {
            toast.warning("empty email", { position: "top-center" })
        } else if (password == "") {
            toast.warning("empty password", { position: "top-center" })
        } else if (password.length < 8) {
            toast.warning("Invaild Passowrd", { position: "top-center" })
        } else {
            const sendingInfo = await fetch(ApiLink + 'login-account', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_email: email,
                    user_pass: password,
                })
            })
            const changeINFO = await sendingInfo.json()
            if (changeINFO.message == 200) {
                Cookies.set("auth_token", changeINFO.auth_token)
                toast.success("login success", { position: 'top-center' })
                setTimeout(() => {
                    window.location.href = "/task"
                }, 1000);
            } else if (changeINFO.message == 400) {
                toast.warning("account not found", { position: 'top-center' })
            } else {
                toast.error("internal server error", { position: 'top-center' })
            }
        }
    }
    return (<>
        <ToastContainer />
        <div className="flex items-center justify-center h-screen">
            <div className="bg-[#2e2e2e] w-[500px] h-[380px] pl-[20px] pt-[20px] rounded-[10px]">
                <div className="mt-[10px]">
                    <h1 className="text-[30px] font-bold">Login <span className="text-lime-400">Here!</span></h1>
                    <p className="text-[20px] ">Getting Ready Your Account</p>
                </div>
                <div className="mt-[20px]">
                    <input id="email" className="w-[95%] h-[45px] border-b-lime-400 border-b-2 pl-[20px] bg-[#272727] outline-0 mt-[15px]" type="email" placeholder="Email" />
                    <input id="password" className="w-[95%] h-[45px] border-b-lime-400 border-b-2 pl-[20px] bg-[#272727] outline-0 mt-[15px]" type="password" placeholder="Password" />
                    <label className="w-[95%] mt-[20px] cursor-pointer justify-center flex items-center h-[45px] bg-green-700 rounded-[7px]" onClick={Login_into_account}>Login &nbsp; <IoMdLogIn size={20} /></label>
                    <p className="mt-[15px] text-center">I Don't Have Account <a href="/sign-up" className="text-lime-500">Rigister Now</a></p>
                </div>
            </div>

        </div>
    </>)
}
export default Login