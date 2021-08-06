export const MAP_AXIS = {
    HOME: {
        x: "date",
        y: "calls"
    },
    AGENT: {
        x: "number",
        y: "duration"
    },
    CALL: {
        x: "date",
        y: "interest"
    },
}

export const CALL_INTEREST = {
    "no answer" : 0,
    "needs follow up" : 1,
    "need reschedule" : 2,
    "interested" : 3,
}

export const MAP_TITLE = {
    HOME: "Total Calls / Month",
    AGENT: "Total Time Spent / Day",
    CALL: "Customer response positivity progression"
}


export const TABLE_HEADINGS = {
    HOME:['Phone number', 'Number of calls', 'Last call details'], 
    AGENT: ['Phone number', 'Call date and time', 'Resolution'],
    CALL: ['Agent Name', 'Call date and time', 'Resolution'],
}

//Should be in a .env file
export const DATA_API_ENDPOINT = "http://localhost:3500/";