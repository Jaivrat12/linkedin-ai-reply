import { cn } from '@/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'contained' | 'outlined';
type ButtonColor = 'default' | 'primary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    color?: ButtonColor;
    startContent?: ReactNode;
    endContent?: ReactNode;
}

const colors: Record<
    ButtonColor,
    { border: string; bg: string; text: string }
> = {
    default: {
        border: 'border-[#666D80]',
        bg: 'bg-[#666D80]',
        text: 'text-[#666D80]',
    },
    primary: {
        border: 'border-[#3B82F6]',
        bg: 'bg-[#3B82F6]',
        text: 'text-white',
    },
};

export default function Button({
    variant = 'outlined',
    color = 'default',
    startContent,
    endContent,
    children,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                `flex items-center gap-2 px-4 py-2 rounded-lg ${colors[color].text}`,
                {
                    [colors[color].bg]: variant === 'contained',
                    [`border-2 ${colors[color].border}`]:
                        variant === 'outlined',
                },
                className,
            )}
            {...props}
        >
            {startContent}
            {children}
            {endContent}
        </button>
    );
}
