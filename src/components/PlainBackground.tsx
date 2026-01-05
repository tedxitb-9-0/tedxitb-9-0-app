import type React from "react"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
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
  red: "/plainbg/rightred.svg",
  pink: "/plainbg/rightpink.svg",
  blue: "/plainbg/rightblue.svg",
}

const leftSmileMap:  Record<string, string> = {
  red: "/plainbg/leftsmile-red.png",
  pink: "/plainbg/leftsmile-pink.png",
  blue: "/plainbg/leftsmile-blue.png",
}

const rightSmileMap:  Record<string, string> = {
  red: "/plainbg/rightsmile-red.png",
  pink: "/plainbg/rightsmile-pink.png",
  blue: "/plainbg/rightsmile-blue.png",
}

interface BackgroundProps {
  color: keyof typeof colorMap,
  children?: React.ReactNode,
}

const PlainBackground: React.FC<BackgroundProps> = ({ color, children }) => {
  const containerRef = useRef<HTMLElement>(null)
  const bgClass = colorMap[color] ?? "bg-red"
  const leftAsset = leftAssetMap[color] ?? ""
  const rightAsset = rightAssetMap[color] ?? ""
  const leftSmile = leftSmileMap[color] ?? ""
  const rightSmile = rightSmileMap[color] ?? ""


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax transforms - both assets scroll up (out to top)
  const leftAssetY = useTransform(scrollYProgress, [0, 1], [0, -300])
  const rightAssetY = useTransform(scrollYProgress, [0, 1], [0, -300])
  const leftSmileX = useTransform(scrollYProgress, [0, 1], [0, 200])
  const rightSmileX = useTransform(scrollYProgress, [0, 1], [0, -200])

  return (
    <section
        ref={containerRef}
        className={`h-fit md:min-h-screen w-full overflow-hidden flex ${bgClass} flex-col items-center justify-center gap-4 bg-cover bg-center bg-no-repeat relative select-none`} 
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


      {/* Left Asset - enters from top, parallax scrolls up */}
      <motion.div
        className="hidden lg:block absolute -top-[25%] left-0 w-xl lg:w-2xl xl:w-2xl z-0"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        style={{ y: leftAssetY }}
      >
        <Image src={leftAsset}  alt="" width={500} height={500} className="w-full h-auto" draggable={false} />
      </motion.div>

      {/* Right Asset - enters from top, parallax scrolls up */}
      <motion.div
        className="absolute lg:-top-[50%] right-8 w-2xl  xl:w-4xl z-0"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
        style={{ y: rightAssetY }}
      >
        <Image src={rightAsset} alt="" width={500} height={500} className="w-full h-full" draggable={false} />
      </motion.div>

      {/* Left Smile */}
      <motion.div
        className="absolute bottom-8 left-[5%] w-20 md:w-28 z-30"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        style={{ x: leftSmileX }}
      >
        <Image src={leftSmile} alt="" width={400} height={400} className="w-full h-auto" draggable={false} />
      </motion.div>

      {/* Right Smile */}
      <motion.div
        className="absolute bottom-8 right-[2%] w-28 md:w-48 z-30"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        style={{ x: rightSmileX }}
      >
        <Image src={rightSmile} alt="" width={400} height={400} className="w-full h-auto" draggable={false} />
      </motion.div>

      {/* White fade at bottom - animates up on first show */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" as const, delay: 0.2 }}
      >
        <Image src="/plainbg/cloud.png" alt="" width={400} height={400} className="w-full h-auto" draggable={false} />
      </motion.div>


 
        {children}
    </section>
  )
}

export default PlainBackground

