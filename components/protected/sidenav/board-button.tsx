"use client"

import { AccordionItem , AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { Moon } from "lucide-react";

export type Boards = {
    id: string,
    name:string | null,
    imageUrl:string | null,
    userId:string,
    createdAt: Date,
    updatedAt: Date,
  }[] | null

  export type BoardItem = {
    id: string,
    name:string | null,
    imageUrl:string | null,
    userId:string,
    createdAt: Date,
    updatedAt: Date,
  }

interface ProjectProps {
    board: BoardItem;
    isActive: boolean;
    expanded: boolean
    //icon: React.ReactNode;
}

export const BoardCard = ({
    board,
    isActive,
    expanded
}:ProjectProps) => {
    const router = useRouter();

    const onClick = (href: string) =>{
        router.push(`/boards/${board.id}`)
    }
    
    if (!board) {
        return null
    }
    
//className="flex-row flex rounded-md gap-6 p-3 m-0 w-full hover:bg-slate-300"
    /*return (
        <button 
        className={`py-2 px-1 mx-1 items-center flex-row text-md flex w-60 rounded-md 
        transition duration-200 hover:bg-slate-300
        ${isActive  ? 'bg-red-200' : ''}`}
        onClick={()=>{onClick(board.id)}}>
                <div className="bg-green-500 rounded-md size-14 mr-3 "></div>
            <div className="flex flex-col items-start text-nowrap">
                <p >{board.name}</p>
                <p className="text-sm">{"board type"}</p>
            </div>
        </button>
    )*/

    return (
        <button 
        onClick={()=>{onClick(board.id)}}
        className={`
        relative flex items-center text-start my-1 h-12 py-2  
        font-medium rounded-md cursor-pointer 
        transition-all group ${
        isActive  ? "bg-gradient-to-tr from-rose-200 to-rose-100 text-indigo-800" 
        : "hover:bg-indigo-50 text-gray-600" }`}>
            <Moon className="size-12"/>
            <div
            className={`overflow-hidden  transition-all ${
                expanded ? "w-52 ml-2" : "w-0"
            }`}>

            <p >{board.name}</p>
            <p className="text-sm">{"board type"}</p>

            </div>   
        </button>
    )
}