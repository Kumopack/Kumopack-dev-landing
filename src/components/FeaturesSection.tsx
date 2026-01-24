"use client";

import { MapPin, Printer, Award, Zap, Leaf, Clock } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Nearest Location",
    description: "Eco-friendly shipping from factories closest to you, reducing carbon footprint.",
    badge: "Eco-Friendly",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: Printer,
    title: "Advanced Printing",
    description: "Flexo & Digital UV Inkjet technology for vibrant, lasting prints.",
    badge: "High Quality",
    badgeColor: "bg-lavender text-purple-soft",
  },
  {
    icon: Award,
    title: "Factory Badges",
    description: "Verified factories with Popular, Fast Production, and On-demand labels.",
    badge: "Verified",
    badgeColor: "bg-lavender text-purple-soft",
  },
  {
    icon: Zap,
    title: "Instant Quotes",
    description: "Get real-time pricing from multiple factories in seconds.",
    badge: "Fast",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: Leaf,
    title: "Sustainable Options",
    description: "Recyclable and biodegradable packaging materials available.",
    badge: "Green",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    icon: Clock,
    title: "On-Demand Production",
    description: "No minimum orders. Get exactly what you need, when you need it.",
    badge: "Flexible",
    badgeColor: "bg-lavender text-purple-soft",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-accent/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-4 py-2 rounded-full bg-lavender text-purple-soft text-sm font-medium mb-4">
            Smart Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything you need to source packaging
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our intelligent platform connects you with the best factories and features to streamline your packaging journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bento-card opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-lavender flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-purple-soft" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${feature.badgeColor}`}>
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
