import { type ReactNode } from 'react';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    return (
        isOpen && (
            <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[99999999] flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div
                    className="absolute top-0 left-0 right-0 bottom-0 bg-[#0D0D1233]"
                    onClick={onClose}
                />
                <div className="relative bg-white rounded-2xl shadow">
                    {children}
                </div>
            </div>
        )
    );
}
