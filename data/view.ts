import { db } from "@/lib/db"

export const getInitialView = async (projectId: string, userId: string | undefined) => {
    try{
        const project = await db.project.findUnique({
            where: {
                id: projectId,
                members: {
                    some: {
                        userId:userId
                    }
                }
            },
            include: {
                views: {
                    where: {
                        type: "TABLE"
                    },
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        })

        return project
    }
    catch{
        return null
    }
}

export const getViewByViewId = async (viewId : string)=> {
    try{
        const view = await db.view.findFirst({
            where:{
                id: viewId
            }
        })
        return view
    }
    catch{
        return null
    }
}


