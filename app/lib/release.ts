import { cache } from 'react'
import packageJson from '../../package.json'

type GitHubRelease = {
  tag_name?: string
}

const githubReleasesUrl = 'https://api.github.com/repos/phtn/beast/releases/latest'
const fallbackVersion = `v${packageJson.version}`

function normalizeVersion(tagName?: string) {
  if (!tagName) return fallbackVersion
  return tagName.startsWith('v') ? tagName : `v${tagName}`
}

export const getBeastRelease = cache(async function getBeastRelease() {
  try {
    const response = await fetch(githubReleasesUrl, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'beast-docs',
        ...(process.env.GITHUB_TOKEN
          ? {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
            }
          : {})
      },
      next: {
        revalidate: 3600
      }
    })

    if (!response.ok) {
      throw new Error(`GitHub releases request failed with ${response.status}`)
    }

    const release = (await response.json()) as GitHubRelease

    return {
      version: normalizeVersion(release.tag_name),
      source: 'github' as const
    }
  } catch {
    return {
      version: fallbackVersion,
      source: 'package' as const
    }
  }
})
