import React, { useEffect, useState } from "react";
import { Input, Typography, Button } from "@material-tailwind/react";
import { Twitter } from "lucide-react";
import axios from "axios";
import { API } from "../global";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function EmailVerifaction() {
    // emailVerifyToken
    let [token, setToken] = useState("")

    const inputRefs = React.useRef([]);
    const [otp, setOtp] = React.useState(Array(6).fill(""));
    useEffect(() => {
        setToken(otp.join(""))
    }, [otp])
    let navigate = useNavigate()

    async function verifyToken(e) {
        e.preventDefault()
        try {
            let response = await axios.post(`${API}/emailVerification`, { token }, {
                withCredentials: true
            })
            if (response.data.status) {
                toast.success(response.data.message)
                navigate("/login")
                setToken("")
            } else {
                console.log("else", response.data);
            }

        } catch (error) {
            console.log(error.response.data)
        }
    }

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.replace(/[^0-9]/g, "");
        setOtp(newOtp);

        if (value && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    function handleBackspace(event, index) {
        if (event.key === "Backspace" && !event.target.value && index > 0) {
            console.log(inputRefs.current[index - 1]);
            inputRefs.current[index - 1].focus();
        }
    }

    return (
        <div className="flex items-center justify-center h-screen">

            <div className="w-full max-w-sm">
                <Twitter size={40} className="mx-auto mb-10" />
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-center gap-1 text-center font-medium"
                >
                    Enter the 6-digit OTP sent to{" "}
                    <span className="font-bold">rehman@gmail.com</span>
                </Typography>

                <form onSubmit={verifyToken}>
                    <div className="my-4 flex items-center justify-center gap-2">
                        {otp.map((digit, index) => (
                            <React.Fragment key={index}>
                                <Input
                                    type="text"
                                    maxLength={1}
                                    className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    containerProps={{
                                        className: "!min-w-0 !w-10 !shrink-0",
                                    }}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleBackspace(e, index)}
                                    inputRef={(el) => (inputRefs.current[index] = el)}
                                />
                                {index === 2 && <span className="text-2xl text-slate-700">-</span>}
                                <button type="submit"></button>
                            </React.Fragment>

                        ))}
                    </div>
                </form>

                <Typography
                    variant="small"
                    className="text-center font-normal text-blue-gray-500"
                >
                    Did not receive the code? <span className="font-bold">Resend</span>
                </Typography>
            </div>
        </div>
    );
}