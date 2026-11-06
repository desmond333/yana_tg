import { ContentRenderer, DEFAULT_CONTENT, type PageKey } from '@/entities/site-content'

export const ContentPage = ({ page }: { page: PageKey }) => <ContentRenderer blocks={DEFAULT_CONTENT[page]} />
