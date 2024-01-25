import {
  OutputSchema as RepoEvent,
  isCommit,
} from './lexicon/types/com/atproto/sync/subscribeRepos'
import { FirehoseSubscriptionBase, getOpsByType } from './util/subscription'

import * as _ from 'lodash-es'
// import { createSpinner } from 'nanospinner'

let scanned = 0, matched = 0

// const spinner = createSpinner(`Scanned ${scanned} posts, matched ${matched} so far.`).start()

/**
 * detector function for matching the post text as efficiently as possible
 */
function detector(post) {
  let _text = post.record.text.toLowerCase()

  if (_text.includes('#posta') || _text.startsWith('if you see this, post a')) {
    return true
  }
  else {
    return false
  }
}

export class FirehoseSubscription extends FirehoseSubscriptionBase {
  async handleEvent(evt: RepoEvent) {
    if (!isCommit(evt)) return
    const ops = await getOpsByType(evt)

    // This logs the text of every post off the firehose.
    // Just for fun :)
    // Delete before actually using

    for (const post of ops.posts.creates) {
      scanned++
      if (detector(post)) {
        matched++
      }

      // spinner.update({
      //   text: `Scanned ${scanned} posts, matched ${matched} so far.`
      // })
    }

    // automagic house-keeping, apparently
    const postsToDelete = ops.posts.deletes.map((del) => del.uri)
    const postsToCreate = ops.posts.creates
      .filter((create) => {
        // only alf-related posts
        return detector(create)
      })
      .map((create) => {
        // map alf-related posts to a db row
        return {
          uri: create.uri,
          cid: create.cid,
          replyParent: create.record?.reply?.parent.uri ?? null,
          replyRoot: create.record?.reply?.root.uri ?? null,
          indexedAt: new Date().toISOString(),
        }
      })

    if (postsToDelete.length > 0) {
      await this.db
        .deleteFrom('post')
        .where('uri', 'in', postsToDelete)
        .execute()
    }
    if (postsToCreate.length > 0) {
      await this.db
        .insertInto('post')
        .values(postsToCreate)
        .onConflict((oc) => oc.doNothing())
        .execute()
    }
  }
}
