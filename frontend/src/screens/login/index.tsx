import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../../components/topbar";
import Footer from "../../components/Footer";
import SocialAuth from "../../components/socialauth";
import Icon from "../../icons";
//import { SigninContext } from './signin';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const { setrefresh, refresh, apptoken, setapptoken } = useContext(SigninContext);

  //   function signinval() {
  //     if (validateForm()) {
  //       axios
  //         .post('http://ec2-15-206-167-181.ap-south-1.compute.amazonaws.com:3000/auth/login', {
  //           email: email,
  //           password: password
  //         })
  //         .then((res) => {
  //           setapptoken(res.data.accessToken);
  //           setrefresh(res.data.refreshToken);
  //           localStorage.setItem('token', res.data.accessToken);
  //           navigate('/screen');
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           alert(error);
  //         });
  //     }
  //   }

  //   function validateForm() {
  //     const emailPattern = RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  //     const passwordPattern = RegExp('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$');

  //     if (!emailPattern.test(email)) {
  //       alert('Email Address is invalid');
  //       return false;
  //     }

  //     return true;
  //   }

  return (
    <>
      <TopBar />
      <div>
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div
            className="w-[570] p-4 m-auto lg:max-w-xl"
            style={{ width: "500px" }}
          >
            <br />
            <h1 className="text-4xl font-semibold text-black ">Welcome back</h1>
            <h6 className="font-normal pt-1 text-xl text-black ">
              Sign in to your account
            </h6>
            <br />
            <form className="">
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold  text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-slate-700 bg-[#F3F3F3] border rounded-md focus:border-slate-400 focus:ring-slate-600 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2 relative pb-8">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-800"
                >
                  Password
                </label>
                <div className="flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-slate-700 bg-[#F3F3F3] border rounded-md focus:border-slate-400 focus:ring-slate-600 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA] focus:outline-none"
                  >
                    {showPassword ? (
                      <Icon name="hidepassword" height={16} width={16} />
                    ) : (
                      <Icon name="showpassword" height={16} width={16} />
                    )}
                  </button>
                </div>
              </div>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  //signinval();
                }}
              >
                <div className=" pb-6 text-sm text-right text-[#AAAAAA]">
                  <a href="/signup" className="  text-right hover:underline">
                    Forgot password?
                  </a>
                </div>
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-slate-400 focus:outline-none focus:bg-slate-600">
                  Log in
                </button>
              </div>
            </form>
            <div>
              <SocialAuth />
            </div>
            <p className="mb-8 text-xs  text-center pt-28 text-[#AAAAAA]">
              New User?{" "}
              <a href="/signup" className=" text-[#AAAAAA]  hover:underline">
                Register
              </a>
              <br />
            </p>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
