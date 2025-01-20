import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated
}: {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}) {
    return <div className={`pointer rounded-full text-sm p-2 bg-black hover:bg-gray ${activated ? "text-indigo-400" : "text-white/60"}`} onClick={onClick}>
        {icon}
    </div>
}

