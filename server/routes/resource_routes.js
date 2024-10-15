import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createResource, getAllResources, getResourceById,updateResourceById,deleteBusinessById,searchResource,
    getResourceByCategory
 } from "../controllers/resource_controller.js";





const router = Router();

router.post('/',verifyToken,createResource)
router.get('/',verifyToken,getAllResources)
router.get('/search',verifyToken,searchResource)
router.get('/:id',verifyToken,getResourceById)
router.get('/category/:category',verifyToken,getResourceByCategory)
router.patch('/:id',verifyToken,updateResourceById)
router.delete('/:id',verifyToken,deleteBusinessById)

export default router