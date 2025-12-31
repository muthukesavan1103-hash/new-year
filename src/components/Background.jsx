import { memo, useEffect, useState } from "react"
import { motion } from "framer-motion";

function Background() {
    const [stars, setStars] = useState([])

    useEffect(() => {

        const twinkles = Array.from({ length: 20 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            duration: Math.random() * 4 + 3,
        }))
        setStars(twinkles)
    }, [])

    return (
        <>
            <div className="fixed inset-0 bg-linear-to-br from-purple-950/30 via-purple-950/5 to-pink-950/20 pointer-events-none overflow-hidden will-change-transform">

                {/* Grid background */}
                <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[100px_100px]" />
            </div>

            {stars.map(({ left, top, delay, duration }, i) => (
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    key={`star-${i}`}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                    style={{ left, top }}
                    animate={{ opacity: [0, 0.4, 0], scale: [0, 1, 0] }}
                    transition={{ duration, delay, repeat: Infinity }}
                />
            ))}
        </>
    )
}

export default memo(Background)