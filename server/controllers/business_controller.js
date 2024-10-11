import { Business } from "../models/business_model.js";
import { User } from "../models/user_model.js";
import mongoose from 'mongoose'; // Use ES6 import if you're using ES6 modules
const { ObjectId } = mongoose.Types;


export const createBusiness = async (req, res) => {
    const { name, description, category, website, reviews,ratings, location, tags, logoImage } = req.body;
   const owner= req.userId
    try {
        const newBusiness = new Business({
            name,
            description,
            category,
            website,
            owner,
            location,
            tags,
            logoImage,
            reviews,
            ratings,
        });

        const savedBusiness = await newBusiness.save();

        res.status(201).json({
            success:"True",
            message: "Business created successfully",
            business: savedBusiness
        });
    } catch (error) {
        res.status(500).json({
            success:"False",
            message: "Error creating business",
            error: error.message
        });
    }
};
export const getAllBusinesses = async (req, res) => {
    try {
        const businesses = await Business.find().populate('owner', 'name'); 
        // console.log(businesses);
        
        res.status(200).json(businesses);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching businesses",
            error: error.message
        });
    }
};
export const getBusinessById = async (req, res) => {
    const businessId = req.params.id
    try {
        const business = await Business.findById(businessId) ; 
        // console.log(businesses);
        
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching business",
            error: error.message
        });
    }
};
export const updateBusinessById = async (req, res) => {
    const businessId = req.params.id;
    const { 
        name, 
        description, 
        category, 
        website, 
        owner, 
        reviews, 
        ratings, 
        location, 
        tags, 
        logoImage 
    } = req.body;

    try {
        const business = await Business.findById(businessId);

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (business.owner.toString() === req.userId.toString()){
        if (name !== undefined) business.name = name;
        if (description !== undefined) business.description = description;
        if (category !== undefined) business.category = category;
        if (website !== undefined) business.website = website;
        if (owner !== undefined) business.owner = owner;  
        if (reviews !== undefined) business.reviews = reviews;
        if (ratings !== undefined) business.ratings = ratings;
        if (location !== undefined) business.location = location;
        if (tags !== undefined) business.tags = tags;
        if (logoImage !== undefined) business.logoImage = logoImage;

        await business.save();
        
        res.status(200).json({success:true,message:"Business updated successfully",business});
        }
        else {
            return res.status(403).json({ message: 'Permission denied' });
        }
    } catch (error) {
        console.error(error);log
        res.status(500).json({ message: 'Error updating business', error: error.message });
    }
};

export const deleteBusinessById = async (req, res) => {
    const businessId = req.params.id;
    const owner=req.userId;
    
    try {
        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        const user = await User.findById(owner);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
       
        if (user.role === "admin" || business.owner.toString() === req.userId.toString()) {
            await Business.findByIdAndDelete(businessId);
            return res.status(200).json({ message: 'Business deleted successfully' });
        } else {
            return res.status(403).json({ message: 'Permission denied' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting business', error: error.message });
    }
};


export const searchBusinesses = async (req, res) => {
    const { category, tags, name } = req.query; 

    try {
       
        const query = {};

        if (category) {
            query.category = category;
        }

        if (tags) {
            const tagsArray = tags.split(',').map(tag => tag.trim());
            query.tags = { $in: tagsArray }; // Use $in to match any of the tags
        }

        if (name) {
            query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
        }

        const businesses = await Business.find(query);

        res.status(200).json(businesses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching businesses', error: error.message });
    }
};

export const getReviewsById=async(req,res)=>{
    const businessId=req.params.id
try{
const business= await Business.findById(businessId)
if (!business) {
    return res.status(404).json({ message: 'Business not found' });
}
res.status(200).json({name:business.name,reviews:business.reviews})
}
catch{
    console.error(error);
        res.status(500).json({ message: 'Error fetching business reviews', error: error.message });
}
}


export const addReviewsById = async (req, res) => {
    const businessId = req.params.id;
    const {rating, comment } = req.body; 
    const userId=req.userId    
    try {
        const business = await Business.findById(businessId);
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!userId||!rating || !comment) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newReview = {
            rating,
            comment,
            user:userId
        };

        business.reviews.push(newReview);

        await business.save();

        res.status(201).json({ success:true,business});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success:false, message: 'Error adding review', error: error.message });
    }
};

export const editReviewsById = async (req, res) => {
    const  reviewId  = req.params.reviewid;
    const { rating, comment } = req.body; 
    const userId = req.userId; 
    // console.log(reviewId);
    try {
        const business = await Business.findOne({ 'reviews._id':reviewId });
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        console.log("This is bushness",business);
        
        const review = business.reviews.id(reviewId); 

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
   
        if (review.user.toString()!== userId) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        if (rating) review.rating = rating;
        if (comment) review.comment = comment;

        await business.save();

        res.status(200).json({ success:true,message: 'Review updated successfully', business });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success:false, message: 'Error updating review', error: error.message });
    }
};

export const deleteReviewsById = async (req, res) => {
    const  reviewId  = req.params.reviewid;
        const userId = req.userId; 
    try {
        const business = await Business.findOne({ 'reviews._id':reviewId });
        
        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        // Find the review in the business' reviews array
        const review = business.reviews.id(reviewId);
        
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check if the user is the owner of the review
        if (review.user.toString() !== userId) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        // Remove the review using the pull method
        business.reviews.pull({ _id: reviewId });

        // Save the updated business document
        await business.save();

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting review', error: error.message });
    }
};