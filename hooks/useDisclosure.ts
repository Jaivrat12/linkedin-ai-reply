import { useState } from 'react';

export default function useDisclosure(initialState: boolean) {
    const [isOpen, setIsOpen] = useState(initialState);

    return {
        isOpen: isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
    };
}
