const crypto = require('crypto')

// generates a list of Event objects with the data from given guild's info
const eventFetcher = (guild) => {
    const events = []
    return guild.scheduledEvents.fetch().then(discordEvents => {
        Array.from(discordEvents.values()).forEach(event => {
            if (event.entityType == "EXTERNAL") events.push({
                name: getOrNone(event.name),
                description: getOrNone(event.description),
                location: getOrNone(event.entityMetadata.location),
                start: generateTimezoneString(event.scheduledStartAt),
                end: generateTimezoneString(event.scheduledEndAt),
                created: generateTimezoneString(event.createdAt),
                uid: crypto.randomUUID()
            })
        })
        return events
    })
}

// ical wants time strings in a very specific format
const generateTimezoneString = (date) => {
    return date.toISOString()
      .replaceAll(":", "")
      .replaceAll("-", "")
      .split(".")[0] + "Z"
}

// shorthand to avoid repetitive code above
const getOrNone = (text) => text ? text : ""

exports.fetchEvents = eventFetcher
