import { prisma } from "../../config/prisma";
import { AppError } from "../../error/coustom.error";
import { IPostPayload } from "../../interface/post.payload";
import httpStatusCode from "http-status-codes";
 
const createPost=async(payload:IPostPayload)=>{
    console.log("Payload in service:", payload);

    const post=await prisma.post.create({
        data:payload
    })
    return post;
}

const getAllMyPosts=async(userId:string)=>{
    const posts=await prisma.post.findMany({
        where:{authorId:userId},
        include:{author:true}
    })
    return posts;
}

const getPostById=async(postId:string)=>{
    return await prisma.$transaction(async(tx)=>{

        await  tx.post.update({
            where:{id:postId},
            data:{views:{increment:1}}
        })

        const post=await tx.post.findUnique({
            where:{id:postId},
            include:{author:true}
        })
        return post;
    })
}

const likeById=async(postId:string,userId:string)=>{
    return await prisma.$transaction(async(tx)=>{

        const postLike=await tx.postLike.findUnique({
            where:{
                authorId_postId:{
                    authorId:userId,
                    postId:postId
                }
            }
        })

        if(postLike){
            throw new AppError("You have already liked this post",httpStatusCode.BAD_REQUEST);
        }

        await tx.postLike.create({
            data:{
                postId,
                authorId:userId
            }
        })

        await tx.post.update({
            where:{id:postId},
            data:{like:{increment:1}}
        })

    })
}

export const postServices={
    createPost,
    getAllMyPosts,
    getPostById,
    likeById
}