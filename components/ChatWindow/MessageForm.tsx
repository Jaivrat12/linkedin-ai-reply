import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import SendIcon from '../icons/SendIcon';
import ReloadIcon from '../icons/ReloadIcon';
import DownIcon from '../icons/DownIcon';

type MessageFormProps = {
    prompt: string;
    setPrompt: Dispatch<SetStateAction<string>>;
    generateResponse: () => void;
    regenerateResponse: () => void;
    insertReply: (reply: string) => void;
    aiResponse?: string;
};

export default function MessageForm({
    prompt,
    setPrompt,
    generateResponse,
    regenerateResponse,
    insertReply,
    aiResponse,
}: MessageFormProps) {
    const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    };

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (aiResponse) {
            regenerateResponse();
        } else {
            generateResponse();
        }
    };

    return (
        <form
            className="flex flex-col items-end gap-6"
            onSubmit={handleSendMessage}
        >
            <Input
                type="text"
                placeholder="Your Prompt"
                value={prompt}
                onChange={handlePromptChange}
                className="w-full"
                autoFocus
                required
            />

            <div className="flex gap-6">
                {aiResponse && (
                    <Button
                        type="button"
                        variant="outlined"
                        startContent={<DownIcon className="text-xl" />}
                        onClick={() => insertReply(aiResponse)}
                    >
                        Insert
                    </Button>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startContent={
                        aiResponse ? (
                            <ReloadIcon className="text-xl" />
                        ) : (
                            <SendIcon className="text-2xl" />
                        )
                    }
                    disabled={!!aiResponse}
                >
                    {aiResponse ? 'Regenerate' : 'Generate'}
                </Button>
            </div>
        </form>
    );
}
