import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { UserPlus, DoorOpen, Trash2, Settings, ChevronDown, X, Delete } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { ProjectWithMembersWithProfiles } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteProjectModal } from "@/components/modals/delete-project-modal";
import { InviteModal } from "@/components/modals/invite-modal";

interface ProjectDropdownProps {
    project: ProjectWithMembersWithProfiles;
    isAdmin: boolean;
    isMod: boolean;
}

export const ProjectDropdown = ({
    project,
    isAdmin,
    isMod
}:ProjectDropdownProps) =>{
    const { onOpen, onClose } = useModal()
    const [opened, setOpened] = useState(false)
    const router = useRouter()


    return(
    <DropdownMenu onOpenChange={()=>setOpened(!opened)}>
        <DropdownMenuTrigger asChild>
            <div className=" h-14 py-3 items-center justify-between flex p-4 truncate w-60 rounded-tl-md border-r border-card-foreground">
                {project?.name} {opened ? <X/>:<ChevronDown />}
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 border-0 flex flex-col justify-center">
            <DeleteProjectModal />
            <InviteModal />
            {isMod && (
            <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="flex justify-between"
            onClick={()=>onOpen("invite", {project:project})}>
                Invite new associates
                <UserPlus />
            </DropdownMenuItem> 
            )}
            {isAdmin && (
                <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="flex justify-between"
                onClick={()=>{
                    onOpen("DeleteProject", {project:project})
                    //setOpened(!opened)
                    }}>
                    Delete Project
                    <Trash2 />
                </DropdownMenuItem>
            )}
            {!isAdmin && (
            <DropdownMenuItem
            className="flex justify-between"
            onClick={()=>{
                
                onOpen("LeaveProject", {project:project})
                
                }}>
                Leave Project
                <DoorOpen />
            </DropdownMenuItem>
            )}
            <DropdownMenuItem
            onClick={()=>{}}
            className="flex justify-between">
                Project Settings
                <Settings />
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}