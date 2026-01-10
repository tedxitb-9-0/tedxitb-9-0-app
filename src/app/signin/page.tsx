"use client"
import ColorfulBackground from "~/components/ColorfulBackground";
import ComingSoon from "~/components/ComingSoon"
import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import { signIn } from "better-auth/react"

const LoginPage = () => {
  return (
    <>
     <h1 className="sr-only">TEDxITB 9.0 Login</h1>
     <ColorfulBackground>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-[15%] max-w-4xl z-30"
        >
          <Image 
            src="/signin.png" 
            alt="Coming Soon" 
            width={1200} 
            height={100}
            className="w-full h-auto"
            draggable={false}
          />
        </motion.div>
        <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-[50%] rounded-xl bg-white p-8 shadow-xl"
        >
            <Link href="/api/auth/sign-in/google">
              Tes
            </Link> 
        </motion.div>
 
     </ColorfulBackground>
    </>
  )
}

export default LoginPage;
