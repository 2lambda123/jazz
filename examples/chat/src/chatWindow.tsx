import { useAutoSub } from 'jazz-react';
import { Chat, Message } from './dataModel.ts';

export function ChatWindow({ chatId }: { chatId: Chat['id'] }) {
  const chat = useAutoSub(chatId);

  return chat ? <div className='w-full max-w-xl h-full flex flex-col items-stretch'>
    {
      chat.map((msg, i) => (
        <ChatBubble key={msg?.id}
          text={msg?.text}
          by={chat.meta.edits[i].by?.profile?.name}
          byMe={chat.meta.edits[i].by?.isMe}
          time={chat.meta.edits[i].at} />
      ))
    }
    <ChatInput onSubmit={(text) => {
      const msg = chat.meta.group.createMap<Message>({ text });
      chat.append(msg.id);
    }}/>
  </div> : <div>Loading...</div>;
}

function ChatBubble({ text, by, time: t, byMe }:
  { text?: string, by?: string, time?: Date, byMe?: boolean }
) {
  return <div className={`items-${byMe ? 'end' : 'start'} flex flex-col`}>
    <div className='rounded-xl bg-stone-100 dark:bg-stone-700 dark:text-white py-2 px-4 mt-2 min-w-[5rem]'>
      { text }
    </div>
    <div className='text-xs text-neutral-500 ml-2'>
      { by } { t?.getHours() }:{ t?.getMinutes() }
    </div>
  </div>;
}

function ChatInput({ onSubmit }: { onSubmit: (text: string) => void }) {
  return <input className='rounded p-2 border mt-auto dark:bg-black dark:text-white dark:border-stone-700'
    placeholder='Type a message and press Enter'
    onKeyDown={({ key, currentTarget: input }) => {
      if (key !== 'Enter' || !input.value) return;
      onSubmit(input.value);
      input.value = '';
    }}/>
}
