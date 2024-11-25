import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function Counter({ value, direction = "up" }) {
    const ref = useRef(null); // Reference to the <span> element
    const motionValue = useMotionValue(0); // Initial value set to 0 (for both "down" and "up")
    const springValue = useSpring(motionValue, {
        damping: 100, // You can adjust these values for smoother/faster animation
        stiffness: 100, // Higher stiffness means a faster animation
    });

    // Check if the element is in view
    const isInView = useInView(ref, { once: true, margin: "0px" });

    useEffect(() => {
        // When the element is in view, animate to the desired value
        if (isInView) {
            motionValue.set(direction === "down" ? 0 : value);
        }
    }, [motionValue, isInView, value, direction]);

    useEffect(() => {
        // Update the text content of the ref element whenever the spring value changes
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("pl-PL").format(
                    latest.toFixed(0), // Format the number as an integer
                );
            }
        });
    }, [springValue]);

    // Return the <span> element with a default content of 0, making sure it's always visible
    return (
        <span ref={ref} style={{ fontSize: "4rem" }}>
            0
        </span>
    ); // Default text of "0"
}
