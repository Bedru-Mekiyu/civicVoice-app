const express = require('express')
const router = express.Router()

const Feedback = require('../models/Feedback');

exports.createFeedback = async(req, res) => {
    try{
        const { sector, institution, rating, description, attach } = req.body;

        if (!sector || !institution || !rating || !description) {
            return res.status(400).json({
                success: false,
                message: 'Validation error: sector, institution, rating, and description are required.'
            });
        }

        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Validation error: rating must be a number between 1 and 5.'
            });
        }
        const feedback = new Feedback ({
            user: req.user.id,
            sector: req.body.sector,
            institution: req.body.institution,
            description: req.body.description,
            attach: req.body.attach,
            rating:req.body.rating
        });
        const savedfeedback = await feedback.save();
        res.status(201).json({
            success: true,
            data: savedfeedback
        });   
    }   catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getAllFeedback = async(req, res) => {
    try{
        const feedbacks = await Feedback.find().populate('user', 'name email');
        res.status(200).json({
            success: true,
            count: feedbacks.length,
            data: feedbacks
        });
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.getFeedbackById = async(req, res) => {
    try{
        const feedback = await Feedback.findById(req.params.id).populate('user', 'name email');
        if(!feedback){
            return res.status(404).json({
             success: false,
             message: 'feedback not found'
            });
        }
        res.status(200).json({
            success: true,
            data: feedback
        });
    }   catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

exports.deleteFeedbackById = async (req, res) => {
    try{
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback){
            return res.status(404).json({
                success: false,
                message: 'feedback not found'
            });
        } 
        res.status(200).json({
            success: true,
            message: 'feedback deleted successfully'
        });
    }   catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
