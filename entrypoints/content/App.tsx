import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import AiIcon from '@/components/icons/AiIcon';
import ChatWindow from '@/components/ChatWindow';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/utils';

export default function App() {
    const {
        isOpen: isModalOpen,
        onOpen: onModalOpen,
        onClose: onModalClose,
    } = useDisclosure(false);

    // linkedin message input field
    const [messageInput, setMessageInput] = useState<HTMLElement | null>(null);
    const [messageInputIsFocused, setMessageInputIsFocused] = useState(false);
    const messageInputDomRect = messageInput?.getBoundingClientRect();

    const insertReply = (reply: string) => {
        if (!messageInput) {
            return;
        }

        // linkedin's message input is a div with contenteditable set to true
        // so to change its state we need to change its innerHTML and then
        // dispatch an input event to trigger a change and update its internal state
        messageInput.innerHTML = `<p>${reply}</p>`;
        messageInput.dispatchEvent(new Event('input', { bubbles: true }));

        messageInput.focus();
        onModalClose();
    };

    useEffect(() => {
        const onBlur = () => {
            setMessageInputIsFocused(false);
        };

        const onFocusIn = (e: FocusEvent) => {
            const isHTMLInstance = e.target instanceof HTMLElement;
            const isMessageInput =
                isHTMLInstance && e.target.ariaLabel === 'Write a message…';

            if (isMessageInput) {
                const messageInput = e.target;
                messageInput.addEventListener('blur', onBlur);
                setMessageInput(messageInput);
                setMessageInputIsFocused(true);
            }
        };

        document.addEventListener('focusin', onFocusIn);

        // cleanup
        return () => {
            document.removeEventListener('focusin', onFocusIn);
            messageInput?.removeEventListener('blur', onBlur);
        };
    }, [messageInput]);

    return (
        <>
            {messageInputDomRect && (
                <Button
                    variant="contained"
                    onClick={onModalOpen}
                    className={cn(
                        'p-3 justify-center bg-white rounded-full absolute z-[999999] transition-opacity',
                        { 'opacity-0': !messageInputIsFocused }
                    )}
                    style={{
                        top: messageInputDomRect.y + messageInputDomRect.height,
                        left: messageInputDomRect.x + messageInputDomRect.width,
                        translate: '-125% -125%',
                    }}
                >
                    <AiIcon className="text-[1.6rem] text-[#2563EB]" />
                </Button>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={onModalClose}
            >
                <ChatWindow
                    className="p-6 w-[500px]"
                    insertReply={insertReply}
                />
            </Modal>
        </>
    );
}
