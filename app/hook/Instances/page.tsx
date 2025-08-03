"use client"
import axios from "axios";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";
const axiosNormal= axios.create({
    baseURL: `https://health-q-tau.vercel.app`,
    // `https://health-q-tau.vercel.app`
    // `http://localhost:5000`, 
})
const UseAxiosNormal=()=>{
    useEffect(() => {
        // Set up Axios response interceptor
        const interceptor = axiosNormal.interceptors.response.use(
          (response) => {
            return response;
          },
          async (error) => {
            console.log("Error from interceptor:", error.response);
    
            // Handle 401 or 403 errors
            if (error.response?.status === 401 || error.response?.status === 403) {
              try {
                // Perform logout
                await signOut();
                Swal.fire({
                  title: "Logout Successfully",
                  icon: "success",
                });
                // Navigate to login page
                redirect("/auth/signin");
              } 
              catch (logoutError) {
                console.error("Logout error:", logoutError);
              
                let errorCode = "unknown-error";
              
                if (
                  logoutError &&
                  typeof logoutError === "object" &&
                  "code" in logoutError &&
                  typeof (logoutError as any).code === "string"
                ) {
                  errorCode = (logoutError as { code: string }).code.split("auth/")[1] || "unknown-error";
                }
              
                const formattedError = errorCode
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");
              
                Swal.fire({
                  title: "Error",
                  text: formattedError,
                  icon: "error",
                });
              }
              
            }
    
            return Promise.reject(error);
          }
        );
    
        // Clean up interceptor on component unmount
        return () => {
          axiosNormal.interceptors.response.eject(interceptor);
        };
      }, []);
    
      return axiosNormal;
}
export default UseAxiosNormal;