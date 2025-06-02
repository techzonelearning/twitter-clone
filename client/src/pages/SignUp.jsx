import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../global"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AlertWithList } from "../components/AlertWithList";
export default function SignUp() {
    let [errors, setErrors] = useState(null)

    let [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    let navigate = useNavigate()
    // let dispatch = useDispatch()
    async function submitHandler(e) {
        e.preventDefault()
        try {
            let response = await axios.post(`${API}/register`, user, {
                withCredentials: true
            })
            if (response.data.status) {
                toast.success(response.data.message)
                navigate("/email-verifaction")
                setUser({
                    username: "",
                    email: "",
                    password: ""
                })
            } else {
                console.log("else", response);
            }

        } catch (error) {
            setErrors(error.response.data?.error)
        }
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <Card color="transparent" shadow={false}>
                <Typography variant="h4" color="blue-gray">
                    Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form onSubmit={submitHandler} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Name
                        </Typography>
                        <Input
                            type="text"
                            size="lg"
                            placeholder="username"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Your Email
                        </Typography>
                        <Input
                            type="text"
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

                    {/* error  */}
                    {
                        errors && <AlertWithList message={errors} />
                    }
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                I agree the
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-gray-900"
                                >
                                    &nbsp;Terms and Conditions
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button type="submit" className="mt-6" fullWidth>
                        sign up
                    </Button>
                    <Typography color="gray" className="mt-4 text-center font-normal">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-gray-900">
                            Sign In
                        </Link>
                    </Typography>
                </form>
            </Card>
        </div>
    );
}