import { describe, expect, it } from 'vitest'
import { DEFAULT_CONTENT } from './defaults'
import { BLOCK_TYPES, PAGE_KEYS, type ContentBlock } from '../model/types'

describe('site content defaults', () => {
  it('has content for every page', () => {
    PAGE_KEYS.forEach((page) => {
      expect(DEFAULT_CONTENT[page].length).toBeGreaterThan(0)
    })
  })

  it('uses only known block types and unique ids', () => {
    const allBlocks: ContentBlock[] = PAGE_KEYS.flatMap((page) => DEFAULT_CONTENT[page])
    const ids = allBlocks.map((block) => block.id)

    expect(new Set(ids).size).toBe(ids.length)
    allBlocks.forEach((block) => {
      expect(BLOCK_TYPES).toContain(block.type)
    })
  })

  it('keeps the four fixed sections', () => {
    expect(PAGE_KEYS).toEqual(['home', 'services', 'library', 'cases'])
  })
})
