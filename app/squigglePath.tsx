import * as motion from "motion/react-client";

const transition = { duration: 4, yoyo: Infinity, ease: "easeInOut" };

export default function MotionPath() {
    return (
        <div style={{ position: "relative" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="800">
                <motion.path
                    d="M 50 50 Q 100 100 50 150 T 50 250 Q 100 300 50 350 T 50 450 Q 100 500 50 550 T 50 650"
                    fill="blue"
                    strokeWidth="12"
                    stroke="var(--hue-6-transparent)"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.001 }}
                    animate={{ pathLength: 1 }}
                    transition={transition}
                />
            </svg>
            <motion.div
                style={box}
                initial={{ offsetDistance: "0%", scale: 2.5 }}
                animate={{ offsetDistance: "100%", scale: 1 }}
                transition={transition}
            />
        </div>
    );
}

/**
 * ==============   Styles   ================
 */

const box: React.CSSProperties = {
    width: 50,
    height: 50,
    backgroundColor: "var(--hue-6)",
    borderRadius: 10,
    position: "absolute",
    top: 0,
    left: 0,
    offsetPath: `path("M 50 50 Q 100 100 50 150 T 50 250 Q 100 300 50 350 T 50 450 Q 100 500 50 550 T 50 650")`,
};
