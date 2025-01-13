import dotenv from 'dotenv'
import http from 'http'
import events from 'events'
import express from 'express'

function run() {
  dotenv.config()
  const app = express()

  app.use((req, res, next) => {
    res.send({
      cursor:
        '1736788677461::bafyreiardf5bo26qxtq7fnzpc557dvaxyja3yfsmnw7qkqnzwjg7cycxym',
      feed: [
        {
          post: 'at://did:plc:r33d6wynfbi5mfinrjqfbmt5/app.bsky.feed.post/3lfnd4dkpi22t',
        },
      ],
    })
  })

  app.listen(process.env.FEEDGEN_PORT, () => {
    console.log(`Dummy server listening on port ${process.env.FEEDGEN_PORT}`)
  })
}

run()

// import FeedGenerator from './server'

// const run = async () => {
//   dotenv.config()
//   const hostname = maybeStr(process.env.FEEDGEN_HOSTNAME) ?? 'example.com'
//   const serviceDid =
//     maybeStr(process.env.FEEDGEN_SERVICE_DID) ?? `did:web:${hostname}`
//   const server = FeedGenerator.create({
//     port: maybeInt(process.env.FEEDGEN_PORT) ?? 3000,
//     listenhost: maybeStr(process.env.FEEDGEN_LISTENHOST) ?? 'localhost',
//     sqliteLocation: maybeStr(process.env.FEEDGEN_SQLITE_LOCATION) ?? ':memory:',
//     subscriptionEndpoint:
//       maybeStr(process.env.FEEDGEN_SUBSCRIPTION_ENDPOINT) ??
//       'wss://bsky.network',
//     publisherDid:
//       maybeStr(process.env.FEEDGEN_PUBLISHER_DID) ?? 'did:example:alice',
//     subscriptionReconnectDelay:
//       maybeInt(process.env.FEEDGEN_SUBSCRIPTION_RECONNECT_DELAY) ?? 3000,
//     hostname,
//     serviceDid,
//   })
//   await server.start()
//   console.log(`Server listening at http://${server.cfg.listenhost}:${server.cfg.port}/`)
// }

// const maybeStr = (val?: string) => {
//   if (!val) return undefined
//   return val
// }

// const maybeInt = (val?: string) => {
//   if (!val) return undefined
//   const int = parseInt(val, 10)
//   if (isNaN(int)) return undefined
//   return int
// }

// run()
