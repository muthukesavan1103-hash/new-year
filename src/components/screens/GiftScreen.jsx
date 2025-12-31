import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain, Briefcase, ChevronRight, CloudRain, Gift, MapPin, Ticket } from "lucide-react";
import confetti from "canvas-confetti";
import { giftHeading, giftSubHeading } from "@/data";


export default function GiftScreen({ onNext }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showReveal, setShowReveal] = useState(false);

    const fireConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 70,
            startVelocity: 35,
            gravity: 0.9,
            ticks: 200,
            origin: { y: 0.6 },
            colors: [
                "#f472b6", // pink
                "#a855f7", // purple
                "#fb7185", // rose
                "#f9a8d4", // soft pink
            ],
        });
    };

    const handleGiftClick = () => {
        fireConfetti();
        setIsOpen(true);
        setTimeout(() => setShowReveal(true), 600);
    };

    // Draggable cards
    const items = [
        { id: 1, icon: MapPin, bg: "bg-blue-200", x: -20, y: -20, rot: -5, text: "Distance" },
        { id: 2, icon: Brain, bg: "bg-yellow-200", x: 20, y: -40, rot: 10, text: "Stress" },
        { id: 3, icon: Briefcase, bg: "bg-orange-200", x: -30, y: 30, rot: -8, text: "Work" },
        { id: 4, icon: CloudRain, bg: "bg-pink-200", x: 40, y: 40, rot: 5, text: "Bad Days" },
    ];

    return (
        <div className="h-full flex flex-col items-center justify-center relative">
            <AnimatePresence mode="wait">
                {!showReveal ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        key="cards">
                        <motion.div
                            className="text-center mb-8 will-change-transform"
                        >
                            <h2 className={`text-2xl md:text-3xl font-medium text-white mb-2`}>{giftHeading}</h2>
                            <p className={`text-white/60 text-sm md:text-base`}>{giftSubHeading}</p>
                        </motion.div>

                        <div className="relative backdrop-blur-lg rounded-3xl px-10 py-12 md:p-14 overflow-hidden border border-white/10 bg-white/5 w-82 h-82 md:w-100 md:h-100 flex items-center justify-center mx-auto">
                            {/* Gift */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleGiftClick}
                                className="z-0 flex flex-col items-center justify-center group"
                            >
                                <motion.div
                                    animate={isOpen ? { scale: 1.5, rotate: 360, opacity: 0 } : {}}
                                    transition={{ duration: 0.5 }}
                                    className={`w-24 h-24 bg-linear-to-br from-rose-400 to-pink-600 rounded-2xl shadow-[0_0_30px_rgba(244,63,94,0.3)] flex items-center justify-center text-white transition-all duration-500 ${isOpen ? "scale-150 opacity-0" : ""}`}>
                                    <Gift size={40} className="" />
                                </motion.div>
                            </motion.button>

                            {/* Draggable cards */}
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    drag
                                    dragConstraints={{ left: -150, right: 150, top: -150, bottom: 150 }}
                                    whileDrag={{ scale: 1.05, cursor: "grabbing" }}
                                    initial={{ x: item.x, y: item.y, rotate: item.rot }}
                                    className={`absolute w-28 h-36 ${item.bg} rounded-xl shadow-xl flex flex-col items-center justify-center cursor-grab z-10 border-4 border-white will-change-transform`}
                                >
                                    <item.icon className="text-slate-500 mb-2" size={32} />
                                    <span className="text-slate-600/85 font-semibold">{item.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="reveal"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full max-w-md"
                    >
                        <p className="invisible -mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 2 }}
                            transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 120 }}
                            className="bg-linear-to-br from-amber-100/80 to-amber-200/80 rounded-3xl p-1 shadow-[0_0_30px_rgba(251,191,36,0.2)] ">
                            <div className="bg-slate-900 rounded-3xl p-6 border border-amber-400/30 text-center relative overflow-hidden">
                                {/* Ticket Design */}
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-950 rounded-full" />
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-slate-950 rounded-full" />
                                <div className="absolute top-1/2 left-6 right-6 h-0.5 border-t-2 border-dashed border-white/10" />

                                <div className="mb-8">
                                    <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400">
                                        <Ticket size={32} />
                                    </div>
                                    <h2 className="text-amber-200 text-2xl font-semibold uppercase tracking-widest mb-4">Golden Ticket</h2>
                                    <p className="text-white/40 text-xs uppercase">Valid for every day ahead</p>
                                </div>

                                <div className="mt-8">
                                    <p className="text-white/80 italic">"Unlimited Love & Smiles"</p>
                                    <p className="text-white/30 text-xs mt-2">No expiration date</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            onClick={onNext}
                            className="mx-auto mt-12 flex items-center gap-2 text-white/60 hover:text-white transition-colors uppercase text-sm tracking-widest"
                        >
                            Claim Ticket <ChevronRight size={14} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};