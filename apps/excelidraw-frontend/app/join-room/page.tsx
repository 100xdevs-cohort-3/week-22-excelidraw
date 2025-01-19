"use client";

import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Label } from "@repo/ui/label";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";

export default function JoinRoom() {
  const [roomId, setRoomId] = useState<string>('');
 const router = useRouter();
  function handleRoomJoin() {

    if(!roomId){
        toast.error("RoomID is Required", {
            position: "bottom-right",
            duration: 3000,
        })
        return;
    }

    if(!(/^\d+$/).test(roomId)){
        toast.error("RoomId must be number", {
            position: "bottom-right",
            duration: 3000,
        })
    }
    router.push(`canvas/${roomId}`)
  }
  return (
    <section className="px-4 relative overflow-hidden min-w-full">
  
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-30 dark:opacity-20 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-screen bg-transparent flex flex-col justify-center py-12 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sm:mx-auto sm:w-full sm:max-w-md"
        >
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            {"Enter your room id"}
          </h2>

          <div>
            <Label htmlFor="roomId">RoomId</Label>
            <div className="">
              <Input
                id="roomId"
                name="roomId"
                type="text"
                autoComplete="roomId"
                required
                value={(roomId)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRoomId((e.target.value))
                }
                className=""
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4  dark:bg-black text-white bg-gray-800" onClick={handleRoomJoin}>
            Join room
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
