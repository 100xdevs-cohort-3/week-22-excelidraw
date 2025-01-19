"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@repo/ui/select";
import { Users, Lock, Globe } from "lucide-react";
import axios from "axios";
import { BCK_API } from "@/config";
import { getVerifiedToken } from "@/lib/cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [visibility, setVisibility] = useState("public");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getVerifiedToken();

    if (!token) {
      toast.error(`TOKEN IS MISSING`, {
        position: "bottom-right",
        duration: 3000,
      });
    }
    try {
        const res = await axios.post(
          `${BCK_API}/room`,
          { name: roomName },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
    
        if(res.data.success){
            toast.success(res.data.message, {
                position: "bottom-right",
                duration: 3000,
            });
            const roomId = res.data.roomId;
            router.push(`/canvas/${roomId}`);
        }
        else{
            toast.error(res.data.message, {
                position: "bottom-right",
                duration: 3000,
            })
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        toast.error("Internal server Error" + error, {
            position: "bottom-right",
            duration: 3000,
        })
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Create a New Room</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Set up your collaborative drawing space
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <Label>Room Name</Label>
              <div className="mt-2">
                <Input
                  id="room-name"
                  name="room-name"
                  placeholder="Enter room name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="selector">Visibility</Label>
              <div id="selector" className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  type="button"
                  className={`justify-center items-center flex gap-2  border-[2px] dark:border-white border-black  ${visibility === "public" ? "dark:bg-black text-white bg-gray-800" : "bg-transparent"}`}
                  onClick={() => setVisibility("public")}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  Public
                </Button>
                <Button
                  type="button"
                  className={`justify-center items-center flex gap-2 border-[2px] dark:border-white border-black  ${visibility === "private" ? "dark:bg-black text-white bg-gray-800" : "bg-transparent"}`}
                  onClick={() => setVisibility("private")}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Private
                </Button>
                <Button
                  type="button"
                  className={`justify-center items-center flex gap-2 border-[2px] dark:border-white border-black ${visibility === "team" ? "dark:bg-black text-white bg-gray-800" : "bg-transparent"}`}
                  onClick={() => setVisibility("team")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Team Only
                </Button>
              </div>
            </div>

            {/* <div>
              <Label>Maximum Participants</Label>
              <div className="mt-2">
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue placeholder="Select maximum participants" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 participants</SelectItem>
                    <SelectItem value="10">10 participants</SelectItem>
                    <SelectItem value="20">20 participants</SelectItem>
                    <SelectItem value="50">50 participants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div> */}

            <Button type="submit" className="w-full dark:bg-black text-white bg-gray-800 ">
              Create Room
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
