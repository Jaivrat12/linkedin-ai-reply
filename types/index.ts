import { MessageSenderTypes } from '@/enums';

export type Message = {
    id: string;
    content: string;
    from: MessageSenderTypes;
};
