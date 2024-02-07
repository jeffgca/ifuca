# Posta Feed

> An @proto feed generator prototype that produces a feed of posts that conform to a specific
> meta-thread convention common on bluesky.

If someone is posting to a specific type of quote-post thread on bluesky, this thread will ( hopefully ) capture that post. The posts this feed is specifically looking for are:

 * that *start with* the text 'if you see this, post a'.
 * include the hashtag '#posta'

## Roadmap

 * [x] working prototype
 * [x] better hashtag detection
 * [ ] Digital Ocean Apps support ( / docker / wtf )
 * [ ] Possible to have scanner behaviour driven by config?
 * [ ] JS > TS / *I am annoyed as a JS developer with how much TS gets in my way with this codebase*


## Links

* This feed is based on bluesky's [excellent feed generator template](https://github.com/bluesky-social/feed-generator)
