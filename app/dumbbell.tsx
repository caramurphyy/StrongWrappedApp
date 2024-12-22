"use client";

import * as motion from "motion/react-client";

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = i * 0.5;
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay, duration: 0.01 },
            },
        };
    },
};

const fade = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
        const delay = i * 0.5;
        return {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay, type: "fade", duration: 3, bounce: 0 },
                opacity: { delay, duration: 1 },
            },
        };
    },
};

export default function PathDrawing() {
    return (
        <motion.svg
            width="600"
            height="300"
            viewBox="0 0 600 300"
            xmlns="http://www.w3.org/2000/svg"
            initial="hidden"
            animate="visible"
            style={image}
        >
            {/* Left Circle */}
            <motion.ellipse
                cx="100"
                cy="150"
                rx="80"
                ry="60"
                stroke="#f3f3f3"
                transform="rotate(-95 95 150)" // Rotates the ellipse 20 degrees
                variants={draw}
                custom={1}
                style={shape}
            />
<motion.ellipse 
            cx={100} 
            cy={150} 
            rx={80} 
            ry={60} 
            fill={"#f3f3f3"} 
            stroke={"#f3f3f3"}
            variants={fade} 
            transform="rotate(-95 95 150)" 
            custom={7}/>


              {/* Left Mini Circle */}
              <motion.ellipse
                cx="100"
                cy="150"
                rx="50"
                ry="35"
                stroke="#f3f3f3"
                transform="rotate(-95 80 170)" // Rotates the ellipse 20 degrees
                variants={draw}
                custom={2}
                style={shape}
            />

<motion.ellipse 
            cx={100} 
            cy={150} 
            rx={50} 
            ry={35} 
            fill={"#f3f3f3"} 
            stroke={"#f3f3f3"}
            variants={fade} 
            transform="rotate(-95 80 170)" 
            custom={7}/>
            {/* Right Circle */}
            <motion.ellipse
                cx="500"
                cy="150"
                rx="80"
                ry="60"
                stroke="#f3f3f3"
                transform="rotate(-95 460 180)" // Rotates the ellipse -20 degrees
                variants={draw}
                custom={3}
                style={shape}
            />

            <motion.ellipse 
            cx={500} 
            cy={150} 
            rx={80} 
            ry={60} 
            fill={"#f3f3f3"} 
            stroke={"#f3f3f3"}
            variants={fade} 
            transform="rotate(-95 460 180)" 
            custom={7}/>

               {/* Right Mini Circle */}
               <motion.ellipse
                cx="500"
                cy="150"
                rx="40"
                ry="35"
                stroke="#f3f3f3"
                transform="rotate(-95 480 160)" // Rotates the ellipse -20 degrees
                variants={draw}
                custom={4}
                style={shape}
            />

<motion.ellipse 
            cx={500} 
            cy={150} 
            rx={40} 
            ry={35} 
            fill={"#f3f3f3"} 
            stroke={"#f3f3f3"}
            variants={fade} 
            transform="rotate(-95 480 160)" 
            custom={7}/>
            {/* Top Line */}
            <motion.line
                x1="150"
                y1="130"
                x2="450"
                y2="130"
                stroke="#f3f3f3"
                variants={draw}
                custom={5}
                style={shape}
            />
            {/* Bottom Line */}
            <motion.line
                x1="150"
                y1="170"
                x2="450"
                y2="170"
                stroke="#f3f3f3"
                variants={draw}
                custom={7}
                style={shape}
            />

        <motion.rect 
            width="300"
            height="40" 
            x="150"
            y="130"
            fill="#f3f3f3"
            stroke="#f3f3f3"
            variants={fade} 
            custom={8}/>

        </motion.svg>

        
    );
}

/**
 * ==============   Styles   ================
 */

const image: React.CSSProperties = {
    display: "block",
    margin: "0 auto",
    maxWidth: "100%",
};

const shape: React.CSSProperties = {
    strokeWidth: 10,
    strokeLinecap: "round",
    fill: "transparent",
};
