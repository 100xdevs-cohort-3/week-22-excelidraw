import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated, shortKey
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
    shortKey: number
}) {
    return <div className={` p-1 hover:bg-[#31303B] transition-all text-white/30 cursor-pointer relative rounded-md  
    ${activated ? "bg-[#403E6A] hover:bg-[#3e3c6a] text-white/70" : ""}`} onClick={onClick}>
        <div className="scale-[0.7] m-1">{icon}</div>
        <p className="absolute -bottom-1 right-1 scale-[0.7] ">{shortKey}</p>
    </div>
}

