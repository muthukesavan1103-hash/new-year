"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { messageScreenHeading, specialMessage } from "@/data";

export default function MessageScreen() {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="px-4 md:px-6 text-center">
            <motion.h2
                className="text-2xl md:text-3xl font-medium text-white drop-shadow mb-2 leading-tight"
            >
                {messageScreenHeading}
            </motion.h2>
            <p className="text-white/50 text-sm mb-8">
                Tap the card to read
            </p>

            <div className="mx-auto relative w-full max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className={`card w-70 h-101.25 max-[360px]:w-62.5 max-[360px]:h-92.5 md:w-[320px] md:h-115 mx-auto cursor-pointer flex items-center ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
                    <div className="back w-70 h-101.25 max-[360px]:w-62.5 max-[360px]:h-92.5 md:w-[320px] md:h-115 -ml-2.5"></div>
                    <div className="front w-70 h-101.25 max-[360px]:w-62.5 max-[360px]:h-92.5 md:w-[320px] md:h-115 -ml-2.5">
                        <div className="imgset h-full">
                            <img loading="lazy" width="100%" className="h-full object-contain" src="/images/cover.webp" />
                        </div>
                    </div>
                    <div className="w-[85%] h-[80%] mx-auto text-[#301733]">
                        <p className="overflow-y-auto h-full pr-2 whitespace-pre-wrap text-left">{specialMessage}</p>
                    </div>
                </motion.div>
            </div>

        </div>
    )
}