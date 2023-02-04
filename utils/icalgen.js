// function used to generate ical file 
// uses data supplied in eventfetcher.js 
const generate = (events, guildName) => {
    const lines = []
    lines.push("BEGIN:VCALENDAR")
    lines.push("VERSION:2.0")
    lines.push("PRODID:DiscordEvents" + guildName + "/EN")
    lines.push("CALSCALE:GREGORIAN")
    lines.push("NAME:Discord event calendar for " + guildName)
    lines.push("X-WR-CALNAME:Discord event calendar for " + guildName)
    lines.push("METHOD:PUBLISH")
    Array.from(events).forEach(event => {
        lines.push("BEGIN:VEVENT")
        lines.push("SUMMARY:" + event.name)
        lines.push("DESCRIPTION:" + event.description)
        lines.push("LOCATION:" + event.location)
        lines.push("DTSTART:" + event.start)
        lines.push("DTEND:" + event.end)
        lines.push("DTSTAMP:" + event.created)
        lines.push("UID:" + event.uid)
        lines.push("END:VEVENT")
    })
    lines.push("END:VCALENDAR")
    return lines.join("\n")
}

exports.generateCal = generate
