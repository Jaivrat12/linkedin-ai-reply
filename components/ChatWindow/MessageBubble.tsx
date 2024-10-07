import { cn } from '@/utils';
import { MessageSenderTypes } from '@/enums';
import type { Message } from '@/types';

type MessageBubbleProps = {
    message: Message;
    className?: string;
};

export default function MessageBubble({
    message,
    className,
}: MessageBubbleProps) {
    return (
        <p
            className={cn(
                'p-4 text-[#666D80] rounded-xl',
                {
                    'ml-auto bg-[#DFE1E7]':
                        message.from === MessageSenderTypes.USER,
                    'mr-auto bg-[#DBEAFE]':
                        message.from === MessageSenderTypes.AI,
                },
                className
            )}
        >
            {message.content}
        </p>
    );
}
