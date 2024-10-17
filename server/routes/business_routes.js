import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createBusiness,
     getAllBusinesses,
      getBusinessById,
      updateBusinessById,
      deleteBusinessById,
      searchBusinesses,
      getReviewsById,
      addReviewsById,
      editReviewsById,
      deleteReviewsById
} from "../controllers/business_controller.js";
const router = Router();


router.post('/create-business',verifyToken,createBusiness)
router.get('/get-all-business',getAllBusinesses)
router.get('/getBusiness/:id',verifyToken,getBusinessById)
router.patch('/updateBusiness/:id',verifyToken,updateBusinessById)
router.delete('/deleteBusiness/:id',verifyToken,deleteBusinessById)
router.get('/search',verifyToken, searchBusinesses);
router.get('/getReviewsById/:id',verifyToken, getReviewsById);
router.post('/addReview/:id',verifyToken,addReviewsById);
router.patch('/editReview/:reviewid',verifyToken,editReviewsById);
router.delete('/deleteReview/:reviewid',verifyToken,deleteReviewsById);

export default router