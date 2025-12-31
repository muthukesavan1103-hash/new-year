import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photos, photoScreenHeading } from "@/data";

const rotations = [-2, 3, -4, 1];

export default function PhotoGalleryScreen({ onNext }) {
    const [index, setIndex] = useState(0);

    const nextPhoto = () => {
        if (index < photos.length - 1) {
            setIndex(index + 1);
        } else {
            onNext();
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-white mb-8">
                {photoScreenHeading}
            </h2>

            <div className="relative aspect-2/3 h-100 mb-10">
                <AnimatePresence>
                    {photos.slice(index).map((src, i) => {
                        const isTop = i === 0;

                        return (
                            <motion.div
                                key={index + i}
                                className="absolute inset-0 border border-black/5 bg-white/90 backdrop-blur-sm p-3 pb-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] will-change-transform"
                                style={{
                                    zIndex: 50 - i,
                                    rotate: isTop ? 0 : rotations[i % rotations.length] + (i + 2),
                                    scale: 1 - i * 0.05,
                                    top: i * 10,
                                }}
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1 - i * 0.05, opacity: 1, y: i * 10 }}
                                exit={{ x: 300, opacity: 0, rotate: 15 }}
                                onClick={isTop ? nextPhoto : undefined}
                                whileHover={isTop ? { scale: 1.02 } : {}}
                            >
                                <div
                                    className={`w-full h-full overflow-hidden rounded-2xl relative`}
                                >
                                    <img
                                        loading="lazy"
                                        src={src}
                                        alt={"img" + (index + 1)}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="mt-3 px-2 py-2">
                                    <div className="flex justify-center space-x-1">
                                        <div className="w-18 h-1 bg-pink-200 rounded-full"></div>
                                        <div className="w-16 h-1 bg-purple-200 rounded-full"></div>
                                        <div className="w-20 h-1 bg-pink-200 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-center space-x-1 mt-2">
                                        <div className="w-20 h-1 bg-purple-200 rounded-full"></div>
                                        <div className="w-14 h-1 bg-pink-200 rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <div className="h-12">
                {index < photos.length && (
                    <p className="text-white/40 text-sm">
                        Tap the photo to continue
                    </p>
                )}
            </div>
        </div>
    );
}