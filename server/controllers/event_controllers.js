import { Event } from "../models/event_model.js";

export const createEvent = async (req, res) => {
    try {
        const {title, description, date, country , state , city} = req.body;

        if (!title || !description || !date) {
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const event = await Event.create({
            title,
            description,
            date,
            location : {country , state , city} ,
            createdBy: req.userId,
        });

        return res.status(200).json({success: true, message: "Event created successfully", event});
    } catch (error) {
        console.log("Error in creating event:", error.message);
        res.status(500).json({
            message: "Error creating event",
            error: error.message
        });
    }
};

export const getUpcomingEvents = async (req, res) => {
    try {
        const events = await Event.find({date: {$gt: new Date()}});
        return res.status(200).json({events});
    } catch (error) {
        console.log("Error fetching upcoming events:", error.message);
        return res.status(500).json({message: "Error getting upcoming events", error: error.message});
    }
};

export const getEventDetailsById = async (req, res) => {
    const {id} = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(400).json({message: "Event not found!", success: false});
        }
        return res.status(200).json({success: true, event});
    } catch (error) {
        console.log("Error getting event by ID:", error.message);
        return res.status(500).json({message: "Error getting event", error: error.message});
    }
};

export const updateEventById = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, date, location = "not mentioned"} = req.body;

        if (!title || !description || !date) {
            return res.status(400).json({success: false, message: "All fields are required"});
        }

        const updatedEvent = await Event.findByIdAndUpdate(id, {
            title, description, date, location
        }, {new: true});

        if (!updatedEvent) {
            return res.status(400).json({success: false, message: "Event not found"});
        }

        return res.status(200).json({success: true, message: "Successfully updated event", updatedEvent});
    } catch (error) {
        console.log("Error in updating event:", error.message);
        return res.status(500).json({message: "Error updating event", error: error.message});
    }
};

export const deleteEventById = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(400).json({success: false, message: "Event not found"});
        }
        return res.status(200).json({message: "Event deleted successfully", success: true});
    } catch (error) {
        console.log("Error deleting event:", error.message);
        return res.status(500).json({message: "Error deleting event", error: error.message});
    }
};

export const registerForAnEvent = async (req, res) => {
    try {
        const {eventId} = req.params;
        const userId = req.userId; // Assuming it's coming from authentication middleware
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({message: "Event not found", success: false});
        }

        if (event.attendees.includes(userId)) {
            return res.status(400).json({message: "User already registered", success: false});
        }

        event.attendees.push(userId);
        await event.save();
        return res.status(200).json({message: "Successfully registered for the event", success: true});
    } catch (error) {
        console.log("Error in registering for event:", error.message);
        return res.status(500).json({message: "Error registering for event", error: error.message});
    }
};

export const getAttendeesForAnEvent = async (req, res) => {
    try {
        const {id} = req.params;
        const event = await Event.findById(id).populate("attendees");

        if (!event) {
            return res.status(400).json({message: "Event not found"});
        }

        if (!event.attendees || event.attendees.length === 0) {
            return res.status(200).json({message: "No attendees for this event", attendees: []});
        }

        return res.status(200).json({attendees: event.attendees});
    } catch (error) {
        console.log("Error fetching attendees for event:", error.message);
        return res.status(500).json({message: "Error fetching attendees", error: error.message});
    }
};


export const searchEvents = async (req , res) => {
    try {
        const {title , location , date } = req.query;

        const searchQuery = {} ;
        if(title) {
            searchQuery.title = {$regex : title , $options : "i"};
        }

        if(date) {
            searchQuery.date = date;
        }

        if(location) {
            searchEvents.location = {$regex : location , $options : "i"}
        }

        const events = await Event.find(searchQuery);

        if(events.length == 0) {
            return res.status(404).json({message : "No events found" , success : false})
        }
        return res.status(200).json({message : "events found" , events});
    } catch (error) {
        console.log("Error searching for event:", error.message);
        return res.status(500).json({message: "Error searching events", error: error.message});
    }
}