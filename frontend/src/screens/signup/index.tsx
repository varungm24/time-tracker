import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TopBar from "../../components/topbar";
import SocialAuth from "../../components/socialauth";
import Footer from "../../components/Footer";
import Icon from "../../icons";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State to track button disable/enable

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  // function signupval() {
  //     if (validateForm()) {
  //         axios
  //             .post("auth/register", {
  //                 email: email,
  //                 password: password,
  //                 name: name,
  //             })
  //             .then(() => {
  //                 alert("SignedUp success");
  //                 navigate("/login");
  //             })
  //             .catch((error) => {
  //                 console.error(error);
  //                 alert("SignedUp failed");
  //             });
  //     }
  // }

  // function validateForm() {
  //     const emailRegex = /^[\w\.-]+@[\w\.-]+\.\w+$/;
  //     const nameRegex = /^[A-Za-z]+[A-Za-z ]*$/;
  //     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //     const isEmailValid = emailRegex.test(email);
  //     const isNameValid = nameRegex.test(name);
  //     const isPasswordValid = passwordRegex.test(password);

  //     return isEmailValid && isNameValid && isPasswordValid;
  // }

  // function handleInputChange(e) {
  //     const inputName = e.target.name;
  //     const inputValue = e.target.value;

  //     if (inputName === "email") {
  //         setEmail(inputValue);
  //     } else if (inputName === "password") {
  //         setPassword(inputValue);
  //     } else if (inputName === "name") {
  //         setName(inputValue);
  //     }

  //     const isValidForm = validateForm();
  //     setIsButtonDisabled(!isValidForm);
  // }

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
            <h1 className="text-4xl font-semibold text-black ">
              Create your account
            </h1>
            <h6 className="font-normal pt-1 text-xl text-black ">
              Welcome to our platform! Sign up now
            </h6>
            <br />
            <form className="">
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold  text-gray-800"
                >
                  Name
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-slate-700 bg-[#F3F3F3] border rounded-md focus:border-slate-400 focus:ring-slate-600 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
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
                    type={isPasswordVisible ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-slate-700 bg-[#F3F3F3] border rounded-md focus:border-slate-400 focus:ring-slate-600 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#AAAAAA] focus:outline-none"
                  >
                    {isPasswordVisible ? (
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
                <div className=" pb-6 text-xs  text-[#AAAAAA]">
                  <span>
                    Upon clicking Register,you agree to our{" "}
                    <a
                      href="/privacy-policy"
                      className=" text-violet-300 hover:underline"
                    >
                      privacy policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="/terms-and-conditions"
                      className=" text-violet-300  hover:underline"
                    >
                      terms and conditions
                    </a>
                  </span>
                </div>
                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-slate-400 focus:outline-none focus:bg-slate-600">
                  Register
                </button>
              </div>
            </form>
            <div>
              <SocialAuth />
            </div>
            <p className="mb-8 text-xs  text-center pt-7 text-[#AAAAAA]">
              Existing user?{" "}
              <a href="/login" className=" text-[#AAAAAA]  hover:underline">
                Signin
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

export default SignUp;
