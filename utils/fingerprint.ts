import FingerprintJS from '@fingerprintjs/fingerprintjs'

async function getVisitorId() {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  return result.visitorId
}
