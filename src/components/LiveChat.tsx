"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute bottom-16 right-0 w-80 bg-card border border-border/50 rounded-2xl shadow-float overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-brand-purple to-brand-cyan p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <span className="font-semibold">Kumopack Assist</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Chat Content */}
                        <div className="h-64 p-4 overflow-y-auto bg-muted/10 space-y-4">
                            <div className="bg-muted px-3 py-2 rounded-2xl rounded-tl-none text-sm max-w-[85%]">
                                Hello! How can we help you with your packaging needs today?
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-border/30 bg-card flex gap-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 bg-muted/30 border-none focus:ring-1 focus:ring-brand-purple rounded-xl px-3 py-2 text-sm"
                            />
                            <Button size="icon" className="h-9 w-9 bg-brand-purple">
                                <Send size={16} />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full shadow-glow bg-gradient-to-br from-brand-purple to-brand-cyan hover:scale-110 transition-transform flex items-center justify-center p-0"
            >
                <MessageCircle className="text-white" size={24} />
            </Button>
        </div>
    );
};

export default LiveChat;
