import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
// import * as Yup from "yup";

import { toast } from "react-toastify";
import { useLoginMutation } from "../redux/userApiSlice";
import { setCredential } from "../redux/authSlice";
// import { registerUser } from "../redux/userSlice";
//Form schema
// const formSchema = Yup.object({
//   // name: Yup.string().required("First Name is required"),
//   //   lastName: Yup.string().required("Last Name is required"),
//   email: Yup.string().required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

const LoginScreen = () => {
  //formik

  const [email, setemail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("/redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, navigate, redirect]);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(signInSchema),
  // });

  // const onSubmit = async (values) => {
  //   let res = await dispatch(useLoginMutation({ ...values }));
  //   console.log(res);
  //   if (res?.payload?.user) {
  //     navigate("/");
  //   }
  // };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const res = await login({ email, password }).unwrap();
      dispatch(setCredential({ ...res }));
      // const userCartData = await setCredential(res.id);
      // dispatch(setCart(userCartData));
      toast.success("login succesfuly ...");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  //   useEffect(() => {
  //     if (user) {
  //       navigate("/dashboard");
  //     }
  //   }, [user]);

  return (
    <section className="relative py-20 2xl:py-40 bg-gray-800 overflow-hidden h-full">
      <div className="relative container px-4 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md">
                <h3 className="text-4xl text-slate-200">NW App Login PAge</h3>

                {/* <span className="text-lg text-blue-400 font-bold">
                  Clearance Dept
                </span> */}
                <h2 className="mt-8 mb-12 text-5xl font-bold font-heading text-white">
                  Login with right Credentials
                </h2>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gray-600 rounded-lg">
                <h3>Login </h3>
                <form className="mt-6" onSubmit={submitHandler}>
                  <div className="mb-2">
                    <label
                      for="email"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      email
                    </label>
                    <input
                      type="text"
                      value={email}
                      placeholder="Enter email"
                      onChange={(e) => setemail(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      for="password"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      placeholder="Enter Your Password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  {/* <a
                    href="#"
                    className="text-md text-purple-600 hover:underline"
                  >
                    Forget Password?
                  </a> */}
                  <div className="mt-6">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                      Login {isLoading && <Loader />}
                    </button>
                  </div>
                  <div>
                    <p>
                      New User{" "}
                      <Link to="/register">
                        <button>Register</button>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginScreen;
