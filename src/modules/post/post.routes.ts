import { Router } from "express";
import { postController } from "./post.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { postValidation } from "./post.zod.validation";

const router=Router()

router.post('/create-post',validateRequest(postValidation),checkAuth(Role.USER),postController.createPost)
router.get('/my-posts',checkAuth(Role.USER),postController.getAllMyPosts)
router.get('/:postId',checkAuth(Role.USER),postController.getPostById) 
router.post('/like/:postId',checkAuth(Role.USER),postController.likeById)

export const postRoutes=router;