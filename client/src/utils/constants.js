export const HOST = "http://localhost:8000"

export const LOGIN_ROUTE = `api/auth/login`
export const REGISTER_ROUTE = 'api/auth/signup'
export const VERIFY_EMAIL = 'api/auth/verify-email'
export const GET_USER_INFO = 'api/auth/check-auth'
export const LOGOUT_ROUTE = 'api/auth/logout'
export const SETUP_PROFILE = 'api/auth/profile-setup'

export const GET_ALL_RESOURCES = 'api/resource/'
export const GET_ALL_RESOURCE = 'api/resource/'
export const GET_RESOURCE_BY_USERID = 'api/resource/get-resources-by-user-id'

export const GET_ALL_BUSINESSES = 'api/business/get-all-business'
export const POST_A_BUSINESS = 'api/business/create-business'
export const GET_BUSINESSES_BY_USERID = 'api/business/get-businesses-by-user-id'

export const GET_ALL_EVENTS =  `api/event/upcoming-events`
export const CREATE_A_EVENT = 'api/event/create-event'
export const GET_EVENTS_BY_USERID = 'api/event/get-events-by-user-id-upcoming'
export const GET_EVENTS_BY_USERID_COMPLETED = 'api/event/get-events-by-user-id-completed'
export const UPDATE_VIRTUAL_LINK = 'api/event/update-virtual-link'

export const GET_ALL_JOBS = "api/job/get-jobs"
export const GET_JOBS_BY_USER_ID = 'api/job/get-jobs-by-user-id'
export const GET_ALL_COMMUNITY_MESSAGES = "/api/message/get-community-messages"
export const GET_JOBS_BY_LOC = "api/job/get-jobs"
