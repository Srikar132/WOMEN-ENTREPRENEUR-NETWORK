import { Router} from "express";
import { createEvent, deleteEventById,getEventsByUserId, getAttendeesForAnEvent, getEventDetailsById, getUpcomingEvents, registerForAnEvent, searchEvents, updateEventById } from "../controllers/event_controllers.js";
import { checkIsAdminOrEnt, verifyToken } from "../middlewares/verifyToken.js";
const eventRouter = Router();

eventRouter.post('/create-event',verifyToken , checkIsAdminOrEnt , createEvent);
eventRouter.get('/upcoming-events' , getUpcomingEvents);
eventRouter.get('/get-events-by-user-id',verifyToken,getEventsByUserId)
eventRouter.get("/get-event/:id", verifyToken,getEventDetailsById);
eventRouter.put("/update-event/:id" , verifyToken , checkIsAdminOrEnt , updateEventById);
eventRouter.delete('/delete-event/:id',verifyToken, checkIsAdminOrEnt , deleteEventById);
eventRouter.post('/:eventId/register',verifyToken,registerForAnEvent)
eventRouter.get('/:id/get-attendees',verifyToken,getAttendeesForAnEvent);
eventRouter.get('/search',searchEvents)
export default eventRouter;