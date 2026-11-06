import { m } from 'motion/react'
import { APP_NAME } from '@/shared/config'
import { cn, getInitials } from '@/shared/lib'
import { EASE_OUT_EXPO, RichText, SPRING_SOFT } from '@/shared/ui'
import { getChatAvatar } from '../config/avatars'

export type ChatMessage = {
  id: string
  text: string
  avatarUrl?: string
}

export type ChatThreadProps = {
  messages: ChatMessage[]
  reply?: string
  className?: string
}

const STEP = 0.32
const OFFSET = 72

const ChatBubble = ({ message, index }: { message: ChatMessage; index: number }) => {
  const isRight = index % 2 === 1
  const delay = index * STEP

  return (
    <m.div
      className={cn('flex items-end gap-2.5', isRight && 'flex-row-reverse')}
      variants={{
        hidden: { opacity: 0, x: isRight ? OFFSET : -OFFSET },
        show: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: EASE_OUT_EXPO } },
      }}
    >
      <m.img
        src={getChatAvatar(index, message.avatarUrl)}
        alt=""
        width={40}
        height={40}
        loading="lazy"
        className="size-9 shrink-0 rounded-full bg-panel-2 shadow-card ring-2 ring-panel md:size-11"
        variants={{ hidden: { scale: 0.4 }, show: { scale: 1, transition: { ...SPRING_SOFT, delay: delay + 0.1 } } }}
      />
      <div
        className={cn(
          'max-w-[78%] rounded-2xl border border-line/60 px-4 py-2.5 text-body leading-snug text-text shadow-card md:max-w-[70%] md:text-base',
          isRight ? 'rounded-br-md bg-[color-mix(in_srgb,var(--accent)_9%,var(--panel))]' : 'rounded-bl-md bg-panel',
        )}
      >
        {message.text}
      </div>
    </m.div>
  )
}

export const ChatThread = ({ messages, reply, className }: ChatThreadProps) => {
  const replyDelay = messages.length * STEP + 0.2

  return (
    <m.div
      className={cn('flex flex-col gap-3.5 overflow-x-clip py-1 md:gap-4', className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    >
      {messages.map((message, index) => (
        <ChatBubble key={message.id} message={message} index={index} />
      ))}

      {reply && (
        <div className="flex items-end justify-end gap-2 pt-2">
          <m.div
            className="flex flex-col items-end gap-1"
            variants={{
              hidden: { opacity: 0, y: 16, scale: 0.92 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: replyDelay, ease: EASE_OUT_EXPO } },
            }}
            style={{ transformOrigin: 'bottom right' }}
          >
            <RichText
              text={reply}
              className="bg-accent-gradient max-w-[300px] rounded-2xl rounded-br-md px-4 py-3 text-body leading-snug text-accent-text shadow-glow md:max-w-sm md:text-base"
              markClassName="bg-[linear-gradient(transparent_58%,rgb(255_255_255/35%)_58%)]"
            />
          </m.div>
          <m.span
            className="bg-accent-gradient flex size-8 shrink-0 items-center justify-center rounded-full font-display text-[11px] font-bold text-accent-text ring-2 ring-panel"
            variants={{ hidden: { opacity: 0, scale: 0 }, show: { opacity: 1, scale: 1, transition: { delay: replyDelay } } }}
          >
            {getInitials(APP_NAME)}
          </m.span>
        </div>
      )}
    </m.div>
  )
}
