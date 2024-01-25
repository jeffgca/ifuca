import { createSpinner } from 'nanospinner'
import dotenv from 'dotenv'

dotenv.config()

let loops = 0, found = 0

const DEV_URL = 'http://localhost:3000/xrpc/app.bsky.feed.getFeedSkeleton?feed=at://did:example:alice/app.bsky.feed.generator/posta'

function scan() {
  fetch(DEV_URL).then((result) => {
    result.json().then((_res) => {
      // console.log(_res)
      if (_res.feed.length > 0) {
        found = _res.feed.length
      }
    }).catch((Err) => {
      console.error('JSON parse error', Err);
    })
  }).catch((Err) => {
    console.error('Request error: ', Err)
  })
}

process.on('exit', (code) => {
  console.log(`About to exit with code: ${code} after ${loops} scans.`)
})

function run() {
  const spinner = createSpinner(`Ran ${loops} so far, found ${found} posts!.`).start()
  let _loop = setInterval(() => {
    scan()
    loops++
    spinner.update({text: `Ran ${loops} so far, found ${found} posts!.`})
  }, 4000);
}

run()