import {
  OutputSchema as RepoEvent,
  isCommit,
} from './lexicon/types/com/atproto/sync/subscribeRepos'

import { FirehoseSubscriptionBase, getOpsByType } from './util/subscription'
import hasSupportedHashtags from './util/hashtags'
import * as _ from 'lodash-es'

/**
 * detector function for matching the post text as efficiently as possible
 */
function posta_detector(post) {
  let lowercase = post.record.text.toLowerCase()
  let hashtags = [ '#posta', '#ifyouseethis' ]
  let preamble = 'if you see this'.toLowerCase()

  // can be case-sensitive?
  let hasHashTags = hasSupportedHashtags(post.record.text, hashtags)
  let hasPreamble = lowercase.startsWith(preamble)

  if (hasHashTags || hasPreamble) {
    return true
  }
}

export class FirehoseSubscription extends FirehoseSubscriptionBase {
  async handleEvent(evt: RepoEvent) {
    if (!isCommit(evt)) return
    const ops = await getOpsByType(evt)

    // automagic house-keeping, apparently
    const postsToDelete = ops.posts.deletes.map((del) => del.uri)
    const postsToCreate = ops.posts.creates
      .filter((create) => {
        return posta_detector(create)
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
