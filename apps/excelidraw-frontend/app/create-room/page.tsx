"use client";
import { PencilRuler } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
export default function SigninPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.name) {
            try {
                const data = {
                    name: formData.name,
                };
                const response = await axios.post("/room", data);
                const roomId = response.data.roomId;
                toast.success("Room created successfully");
                router.push("/canvas/"+roomId);
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        }
    };
    return (
        <>
            <div className="bg-gradient-to-t from-indigo-900 to-white via-indigo-300 dark:from-gray-950 dark:to-indigo-900">
                <div className="absolute top-50 right-50 p-4 cursor-pointer">
                    <PencilRuler
                        className="h-8 w-auto text-indigo-600 dark:text-indigo-400"
                        onClick={() => {
                            router.push("/");
                        }}
                    />
                </div>
                <div className="flex min-h-screen items-center justify-center">
                    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Create a room and collaborate
                            </h1>
                        </div>
                        <form className="mt-6" onSubmit={login}>
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Please enter your name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Harkirat"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none sm:text-sm font-medium"
                                >
                                    Create room
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
