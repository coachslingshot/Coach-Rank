'use client';

import React from 'react';
import { cn } from '@/lib/utils/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
    return (
        <div
            className={cn(
                'bg-white rounded-xl shadow-md overflow-hidden',
                hover && 'transition-all duration-300 hover:shadow-xl hover:scale-[1.02]',
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('px-6 py-4 border-b border-gray-200', className)}>{children}</div>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('px-6 py-4', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn('px-6 py-4 bg-gray-50 border-t border-gray-200', className)}>{children}</div>;
}
