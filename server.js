// code copied from https://nodejs.org/api/synopsis.html
const http = require("node:http")

const hostname = "127.0.0.1"
const port = 3000

// fake data taken from internet and ChatGPT
const data = [
  {
    id: 1,
    title: "Add app alert for changed weather events",
    description:
      "As a user I want to know when bad weater is approaching so I can cover or protect my solar panels",
  },
  {
    id: 2,
    title: "Add ark mode to the application",
    description:
      "Users have requested a dark mode feature to make the application more eye-friendly during nighttime use.",
  },
  {
    id: 3,
    title: "Create user documentation",
    description:
      "Write and publish comprehensive user documentation for the new product release.",
  },
  {
    id: 4,
    title: "Login button not working",
    description:
      "When clicking the login button on the website, nothing happens. The button appears to be unresponsive.",
  },
]

function isAPIRequest(req) {
  return req.headers.host.startsWith("api.")
}

function API(req, res) {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(data))
}

const server = http.createServer((req, res) => {
  if (isAPIRequest(req)) {
    API(req, res)
    return
  }
  res.statusCode = 501
  res.setHeader("Content-Type", "text/plain")
  res.end("Not implemented")
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
