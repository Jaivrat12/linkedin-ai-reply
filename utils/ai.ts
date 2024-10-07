export function getAiResponse(prompt: string) {
    if (prompt.trim().length === 0) {
        throw new Error('Prompt can\'t be empty');
    }

    return 'Thank you for the opportunity! If you have any more questions or if there\'s anything else I can help you with, feel free to ask.';
}
