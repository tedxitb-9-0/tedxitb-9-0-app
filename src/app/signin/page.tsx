"use client"
import ColorfulBackground from "~/components/ColorfulBackground";
import ComingSoon from "~/components/ComingSoon"
import { authClient } from "~/server/better-auth/client";

const LoginPage = () => {
  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google", 
      callbackURL: "/dashboard"
    });

    if (data.error) {
      console.error("Signin Error: ", data.error);
    }
  }

  return (
    <>
     {/* <h1 className="sr-only">TEDxITB 9.0 Login</h1>
     <ColorfulBackground>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="w-[40%] max-w-sm z-30"
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
              className="w-[60%] max-w-xl rounded-xl bg-white p-2 md:p-4 shadow-xl text-center z-40 flex justify-center"
        >
            <button onClick={handleGoogleSignIn} className="text-md md:text-xl p-2 border-black hover:bg-gray-200 rounded-xl flex justify-center items-center gap-2 w-full hover: cursor-pointer">
              
                <Image src="/google.png" height={50} width={50} alt="Google Logo" className="w-6 md:w-8"/>  
                Sign In With Google
            </button> 
        </motion.div>
 
     </ColorfulBackground> */}
     <ComingSoon />
    </>
  )
}

export default LoginPage;
