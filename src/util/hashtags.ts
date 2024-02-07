function getHashTags(txt: string) {
  return txt.split(/\s/).filter(v=> v.startsWith('#'))
}

export default function hasSupportedHashtags(txt: string, supported) {
  let tags = getHashTags(txt)

  // console.log('tags', tags, supported)

  let result = tags.filter((tag) => {
    return ( supported.indexOf(tag) !== -1 )
  })

  return ( result.length > 0 )
}