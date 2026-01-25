"use client";
import ColorfulBackground from "~/_components/ColorfulBackground";
import { authClient } from "~/server/better-auth/client";
import { motion } from "motion/react";
import Image from "next/image";

const LoginPage = () => {
  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });

    if (data.error) {
      console.error("Signin Error: ", data.error);
    }
  };

  return (
    <>
      <h1 className="sr-only">TEDxITB 9.0 Login</h1>
      <ColorfulBackground>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="z-30 w-[40%] max-w-sm"
        >
          <Image
            src="/signin.png"
            alt="Coming Soon"
            width={1200}
            height={100}
            className="h-auto w-full"
            draggable={false}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="z-40 flex w-[60%] max-w-xl justify-center rounded-xl bg-white p-2 text-center shadow-xl md:p-3"
        >
          <button
            onClick={handleGoogleSignIn}
            className="text-md hover: flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-black p-2 hover:bg-gray-100 md:text-xl"
          >
            <Image
              src="/google.png"
              height={50}
              width={50}
              alt="Google Logo"
              className="w-6 md:w-8"
            />
            Sign In With Google
          </button>
        </motion.div>
      </ColorfulBackground>
    </>
  );
};

export default LoginPage;
