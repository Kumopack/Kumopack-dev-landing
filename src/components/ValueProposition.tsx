"use client";

import { motion } from 'framer-motion';

const ValueProposition = () => {
    return (
        <section className="px-4 md:px-8 py-10 md:py-16 bg-gradient-to-b from-background to-muted/30">
            <div className="container mx-auto max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Column - YouTube Video */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-soft border border-border/50 aspect-video">
                            <iframe
                                src="https://www.youtube.com/embed/nYUe1ruHsac"
                                title="Kumopack Introduction"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl -z-10" />
                    </motion.div>

                    {/* Right Column - Value Proposition & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                Direct Connection to{' '}
                                <span className="text-primary font-extrabold">Manufacturers</span>
                            </h2>
                            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                Expanding Sales Channels: Bridging Buyers and Producers.
                                We connect you directly with certified manufacturers, eliminating middlemen
                                and ensuring quality at competitive prices.
                            </p>
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {[
                                { value: '400+', label: 'Successful Projects' },
                                { value: '27%', label: 'Average Cost Savings' },
                                { value: '94%', label: 'User Satisfaction Rate' },
                                { value: '200+', label: 'Standard-Certified Manufacturers' },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 md:p-5 text-center hover:border-primary/30 hover:shadow-soft transition-all duration-300"
                                >
                                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs md:text-sm text-muted-foreground">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;
