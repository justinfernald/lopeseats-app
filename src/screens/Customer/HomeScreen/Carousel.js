import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // animation library
import { wrap } from "@popmotion/popcorn"; // wraps value back around: https://popmotion.io/popcorn/api/wrap/

import Card from "./Card";

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 *
 * source: https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?fontsize=14&module=/src/Example.tsx&file=/src/Example.tsx
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

// In framer motion, these are basically the different states of your animation
// you can play around with these values until you get the animation you want
const variants = {
    enter: direction => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: direction => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const Carousel = ({ cards, ...props }) => {
    // card index, direction can be -1 or 1 for left or right
    const [[card, direction], setCard] = useState([0, 0]);

    const handlePaginate = newDirection =>
        setCard([card + newDirection, newDirection]);

    const cardIndex = wrap(0, cards.length, card);

    const text = cards.map(c => c.title);

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={card}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 200 },
                        opacity: { duration: 0.2 }
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeConfidenceThreshold) {
                            handlePaginate(1);
                        } else if (swipe > swipeConfidenceThreshold) {
                            handlePaginate(-1);
                        }
                    }}
                    style={{ width: "100%" }}
                >
                    <Card {...cards[cardIndex]} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Carousel;
