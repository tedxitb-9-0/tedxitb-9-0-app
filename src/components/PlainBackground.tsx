import type React from "react"
import { motion } from "motion/react"
import Image from "next/image";


const colorMap: Record<string, string> = {
  red: "bg-[linear-gradient(180deg,#B50000_1%,#E50000_35%,#FF5353_100%)]",
  pink: "bg-[linear-gradient(0deg,#FF74B0_1%,#FF3A8C_64%,#D21363_96%)]",
  blue: "bg-[linear-gradient(0deg,#6D65FF_0%,#2014FF_64%,#0A00C2_96%)]",
}

const leftAssetMap: Record<string, string> = {
  red: "/plainbg/leftred.svg",
  pink: "/plainbg/leftpink.svg",
  blue: "/plainbg/leftblue.svg",
}

const rightAssetMap: Record<string, string> = {
  red: "/plainbg/right.svg",
  pink: "/plainbg/rightpink.svg",
  blue: "/plainbg/rightblue.svg",
}

interface BackgroundProps {
  color: keyof typeof colorMap,
  children?: React.ReactNode,
}

const PlainBackground: React.FC<BackgroundProps> = ({ color, children }) => {
  const bgClass = colorMap[color] ?? "bg-red"
  const leftAsset = leftAssetMap[color] ?? ""
  const rightAsset = rightAssetMap[color] ?? ""

  return (
    <section
        className={`h-screen w-full overflow-hidden flex ${bgClass} flex-col items-center justify-center gap-4 bg-cover bg-center bg-no-repeat relative select-none`} 
    >
     {/* Top Left - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 left-0 w-64 md:w-96 z-10"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/plainbg/topleft.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
        </motion.div>
      </motion.div>


      {/* Top Right  - floats diagonally from corner */}
      <motion.div
        className="absolute top-0 right-0 w-48 md:w-64 z-10"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" as const }}
        > <Image src="/plainbg/topright.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} /> </motion.div> </motion.div> {/* Top Right - floats diagonally from corner */} <motion.div
        className="absolute top-0 right-0 w-48 md:w-64 z-10"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/plainbg/topright.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
        </motion.div>
      </motion.div>

      {/* Bottom Left - floats diagonally from corner */}
      <motion.div
        className="absolute bottom-0 left-0 w-64 md:w-md z-10"
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
      >
        <motion.div
          animate={{ x: [0, -10, 0], y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/plainbg/bottomleft.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
        </motion.div>
      </motion.div>

      {/* Bottom Right - floats diagonally from corner */}
      <motion.div
        className="absolute bottom-0 right-0 w-48 md:w-96 z-10"
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
      >
        <motion.div
          animate={{ x: [0, 10, 0], y: [0, 10, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <Image src="/plainbg/bottomright.png" alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
        </motion.div>
      </motion.div>


      {/* Left Asset */}
      <motion.div
        className="hidden md:block absolute top-[50%] left-40 w-64 md:w-2xl z-0"
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <Image src={leftAsset}  alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
      </motion.div>

      {/* Right Asset */}
      <motion.div
        className="hidden md:block absolute top-[50%] right-40 w-48 md:w-2xl z-0"
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
      >
        <Image src={rightAsset} alt="" width={200} height={200} className="w-full h-auto" draggable={false} />
      </motion.div>


      {/* White fade at bottom */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20">
        <Image src="/plainbg/cloud.png" alt="" width={400} height={400} className="w-full h-auto" draggable={false} />
      </div>


 
        {children}
    </section>
  )
}

export default PlainBackground

