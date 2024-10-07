import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className, ...props }: InputProps) {
    return (
        <input
            className={cn('p-3 border rounded-lg border-[#C1C7D0]', className)}
            {...props}
        />
    );
}
