import MessageBubble from './MessageBubble';
import MessageForm from './MessageForm';
import { getAiResponse } from '@/utils/ai';
import { MessageSenderTypes } from '@/enums';
import type { Message } from '@/types';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type DivHTMLProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

interface ChatWindowProps extends DivHTMLProps {
    insertReply: (reply: string) => void;
}

export default function ChatWindow({ insertReply, ...props }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [prompt, setPrompt] = useState('');
    const [error, setError] = useState('');

    const aiResponse =
        messages.length > 0 ? messages.slice(-1)[0].content : undefined;

    const generateResponse = () => {
        try {
            const response = getAiResponse(prompt);
            setMessages((messages) => {
                const prevId = messages.length;
                const userMessage: Message = {
                    id: (prevId + 1).toString(),
                    content: prompt,
                    from: MessageSenderTypes.USER,
                };

                const aiMessage: Message = {
                    id: (prevId + 2).toString(),
                    content: response,
                    from: MessageSenderTypes.AI,
                };

                return messages.concat(userMessage, aiMessage);
            });
            setPrompt('');
            setError('');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            }
        }
    };

    const regenerateResponse = () => {};

    return (
        <div {...props}>
            <p className="mb-6 text-center text-rose-600">{error}</p>

            {messages.map((message) => (
                <MessageBubble
                    key={message.id}
                    message={message}
                    className="mb-6 w-fit max-w-[70%]"
                />
            ))}

            <MessageForm
                prompt={prompt}
                setPrompt={setPrompt}
                generateResponse={generateResponse}
                regenerateResponse={regenerateResponse}
                aiResponse={aiResponse}
                insertReply={insertReply}
            />
        </div>
    );
}
