import type { ComponentType } from 'react'
import type { BlockType, ContentBlock } from '../model/types'
import { CardsBlock } from './CardsBlock'
import { ContactsBlock, CtaBlock } from './ContactBlocks'
import { HeroBlock } from './HeroBlock'
import { MaterialsBlock, PodcastsBlock } from './LibraryBlocks'
import { ReviewsBlock } from './ReviewsBlock'
import { ServiceGrid } from './ServiceCard'
import { AccordionBlock, BulletsBlock, NoteBlock, PainsBlock, StatsBlock, StepsBlock, TextBlock } from './TextBlocks'

type BlockRenderer = ComponentType<{ block: ContentBlock }>

const BLOCK_RENDERERS: Record<Exclude<BlockType, 'service'>, BlockRenderer> = {
  hero: HeroBlock,
  stats: StatsBlock,
  pains: PainsBlock,
  bullets: BulletsBlock,
  text: TextBlock,
  cards: CardsBlock,
  steps: StepsBlock,
  accordion: AccordionBlock,
  reviews: ReviewsBlock,
  materials: MaterialsBlock,
  podcasts: PodcastsBlock,
  contacts: ContactsBlock,
  cta: CtaBlock,
  note: NoteBlock,
}

type RenderGroup = { kind: 'services'; blocks: ContentBlock[] } | { kind: 'block'; block: ContentBlock }

const groupBlocks = (blocks: ContentBlock[]): RenderGroup[] =>
  blocks.reduce<RenderGroup[]>((groups, block) => {
    const last = groups.at(-1)
    if (block.type !== 'service') return [...groups, { kind: 'block', block }]
    if (last?.kind === 'services') {
      last.blocks.push(block)
      return groups
    }
    return [...groups, { kind: 'services', blocks: [block] }]
  }, [])

export const ContentRenderer = ({ blocks }: { blocks: ContentBlock[] }) => (
  <div className="flex flex-col gap-16 pb-6 md:gap-28">
    {groupBlocks(blocks).map((group) => {
      if (group.kind === 'services') return <ServiceGrid key={group.blocks[0]?.id} blocks={group.blocks} />
      if (group.block.type === 'service') return null
      const Renderer = BLOCK_RENDERERS[group.block.type]
      return <Renderer key={group.block.id} block={group.block} />
    })}
  </div>
)
