import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { introHeading, introSubHeading } from "@/data";

export default function IntroScreen({ onNext }) {
    const [holding, setHolding] = useState(false);
    const [completed, setCompleted] = useState(false);

    const controls = useAnimation();
    // Progress logic
    useEffect(() => {
        let timer;

        if (holding && !completed) {
            // start / continue progress
            controls.start({
                pathLength: 1,
                transition: { duration: 2, ease: "linear" },
            });

            timer = setTimeout(() => {
                setCompleted(true);
                controls.set({ pathLength: 1 }); // lock at full
                onNext();
            }, 2000);
        }

        if (!holding && !completed) {
            controls.start({
                pathLength: 0,
                transition: { duration: 1, ease: "easeOut" },
            });
        }

        return () => clearTimeout(timer);
    }, [holding, completed, controls, onNext]);

    return (
        <div className="h-full flex flex-col items-center justify-center relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className=" relative text-center backdrop-blur-xl rounded-3xl px-10 py-12 md:p-14 overflow-hidden border border-white/10 bg-white/5"
            >

                <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/20 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 blur-[80px] rounded-full pointer-events-none" />

                <h1 className="text-2xl md:text-3xl bg-linear-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent font-medium leading-tight mb-3">
                    {introHeading}
                </h1>

                <p className="text-white/60 mt-2 mb-8">
                    {introSubHeading}
                </p>


                {/* Hold Button */}
                <div
                    className="relative flex items-center justify-center cursor-pointer w-max mx-auto"
                    onMouseDown={() => !completed && setHolding(true)}
                    onMouseUp={() => setHolding(false)}
                    onTouchStart={() => setHolding(true)}
                    onTouchEnd={() => setHolding(false)}
                >

                    {/* Ring */}
                    <svg className="w-30 h-30 -rotate-90">
                        <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/10" />
                        <motion.circle
                            cx="60" cy="60" r="58"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="transparent"
                            className="text-pink-300"
                            initial={{ pathLength: 0 }}
                            animate={controls}
                            transition={{ duration: 2, ease: "linear" }}
                        />
                    </svg>

                    <Heart size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-400 fill-current" />

                    {/* Glow Effect */}
                    <motion.div
                        animate={{ scale: holding ? 1.2 : 1, opacity: holding ? 0.5 : 0 }}
                        className="absolute inset-0 bg-pink-400/20 rounded-full blur-2xl -z-10"
                    />
                </div>

                <p className="mt-4 text-white/40 text-sm">
                    Tap and hold
                </p>

            </motion.div>
        </div>

    )
}
