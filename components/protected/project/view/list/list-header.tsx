
import { List, Task } from "@prisma/client"

import { ChevronDown, ChevronDownIcon } from "lucide-react"



import { DeleteListButton } from "./delete-list"
import { EditListTitle } from "./edit-list-title";
import { useContext, useState, useTransition } from "react"

import { CreateTask } from "@/actions/tasks/create-task"
import { useRouter } from "next/navigation"
import { CreateTaskButton } from "../task/create-task-button"
import { ListWithCards } from "@/types"
import { Dispatch, SetStateAction } from "react";
import { TaskCols } from "@/components/table/columns";
import { Table } from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteManyTasks } from "@/actions/tasks/delete-task";
import { Input } from "@/components/ui/input";
import {TooltipProvider} from "@/components/ui/tooltip"
import { projectContext } from "../project-page";


interface ListHeaderProps {
  data: ListWithCards;
  table: Table<TaskCols>
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

export const ListHeader = ({
    data,
    table,
    collapsed,
    setCollapsed
}:ListHeaderProps) => {

    const [pending, startTransition] = useTransition()
    const router = useRouter()
    const projectInfo = useContext(projectContext)
  

    const onSubmit = () => {

      const ids = table
      .getSelectedRowModel()
      .rows
      .map(task=>task.original.id)

      startTransition(()=>{
        DeleteManyTasks(ids)
        .then((data) =>{
            if (data?.error){
                //setError(data?.error)
            }
            else {
                table.toggleAllPageRowsSelected(false)
                router.refresh()
            }
        })
    })
    }


    return (
        
        <div className=" bg-indigo-800 rounded-t-md gap-x-5 px-1 py-2 flex flex-row items-center border-white border-tx-1">
            <TooltipProvider  delayDuration={100} >
              
            <button
            onClick={()=>setCollapsed(!collapsed)}>
                <ChevronDown className="hover:bg-red-600"/>
            </button>
             

            
            <CreateTaskButton roles={projectInfo?.roles} list={data as ListWithCards}  />
            
            <EditListTitle roles={projectInfo?.roles} data={data}/>

            <DeleteListButton roles={projectInfo?.roles} list={data as ListWithCards}/>

            <p>{data.tasks.length} Tasks </p>

            <div className="flex items-center py-0">
              <Input
                placeholder="Filter Titles..."
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("title")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </div>

            
            {(table.getIsSomePageRowsSelected() || 
            table.getIsAllPageRowsSelected()) && 
            (roles?.isMod)
            ?
            <Button
            variant="outline"
            className="bg-red-600 hover:bg-red-700"
            onClick={onSubmit}
            disabled={pending}>
              Delete {table.getSelectedRowModel().rows.length} rows
            </Button>
              :
            <></>
            }
          </TooltipProvider>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="flex flex-col">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                
                const [visible, setVisible] = useState(column.getIsVisible())

                return (
                <Button 
                className="flex flex-row"
                onClick={
                    ()=>{
                        setVisible(!visible)
                        column.toggleVisibility(visible)
                    }
                }
                >
                  <Checkbox
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                
                </Checkbox>
                
                    {column.id}
                </Button>
                )
              })}
          </PopoverContent>
        </Popover>



        
        </div>
    )
}


/*
<TooltipProvider delayDuration={100} >
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button 
                        onClick={enableEditing}
                        disabled={!(role?.isAdmin || role?.isMod)}
                        className={` ${!(role?.isAdmin || role?.isMod) && "bg-green-900 opacity-50 "}
                        w-64 gap-x-4  transition-all flex flex-row rounded-md 
                        bg-green-600 hover:bg-green-700 justify-center items-center`}>
                            <p>Add List</p>
                            <Plus />
                        </button>
                    </TooltipTrigger>
                    {!(role?.isAdmin || role?.isMod) ?
                    <TooltipContent >
                        <p>Cannot create list as member</p>
                    </TooltipContent>
                    :null
                    }
                </Tooltip>
            </TooltipProvider>*/