// code copied from https://nodejs.org/api/synopsis.html
const http = require("node:http")
const fs = require("fs")

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
  // TODO: allow dyanmic allocation of hostname
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(data))
}

function html(req, res) {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/html")
  const data = fs.readFileSync("root.html", "utf-8")
  res.end(data)
}

function css(req, res) {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/css")
  const data = fs.readFileSync("root.css", "utf-8")
  res.end(data)
}

function js(req, res) {
  res.statusCode = 200
  res.setHeader("Content-Type", "text/javascript")
  const data = fs.readFileSync("root.js", "utf-8")
  res.end(data)
}

const server = http.createServer((req, res) => {
  console.log(req.headers.host + req.url)
  if (isAPIRequest(req)) {
    API(req, res)
    return
  }
  if (req.url.endsWith(".css")) {
    css(req, res)
    return
  }
  if (req.url.endsWith(".js")) {
    js(req, res)
    return
  }
  html(req, res)
  return
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
