import {
    Card,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Loader } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../store/auth/auth";

export default function Login() {
    let { error, isLoading, message } = useSelector(state => state.auth)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let [user, setUser] = useState({
        email: "",
        password: ""
    })
   async function submitHandler(e) {
        e.preventDefault()
        let response = await dispatch(loginUser(user))
        if (response.payload.status) {
            toast.success(message)
            navigate("/")
            setUser({
                email: "",
                password: ""
            })
        } else {
            toast.error(error)
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign In
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to login.
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={submitHandler}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                        type="email"
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>

                    <Button type="submit" className="mt-6" fullWidth>
                    {isLoading ? <Loader className="animate-spin mx-auto" /> : "sign In"}
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-medium text-gray-900">
                            Sign Up
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}