'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Trophy, Users, LayoutDashboard, FileText } from 'lucide-react';

export function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Rankings', icon: Trophy },
        { href: '/coaches', label: 'All Coaches', icon: Users },
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/survey', label: 'Rate Coach', icon: FileText },
    ];

    return (
        <nav className="bg-field-green text-white shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center glow-gold group-hover:scale-110 transition-transform">
                            <Trophy className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="font-headline text-3xl tracking-wide">COACH RANK</h1>
                            <p className="text-xs text-gold-light">D1 Football Rankings</p>
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive
                                            ? 'bg-white/20 text-gold-light'
                                            : 'hover:bg-white/10 text-white'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/subscribe">
                            <button className="hidden sm:block px-6 py-2 bg-gold-gradient rounded-lg font-semibold hover:shadow-lg hover:glow-gold transition-all">
                                Go Premium
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
