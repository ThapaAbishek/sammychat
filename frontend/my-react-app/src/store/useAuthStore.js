import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSingningUp: false,
    isLoggingIng: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
onlineUsers:[],
    // Check authentication
   checkAuth: async () => {
  set({ isCheckingAuth: true }); 
  try {
    const res = await axiosInstance.get("/auth/check");
    set({ authUser: res.data });
  } catch (error) {
    console.log("error in checking auth:", error.message);
    set({ authUser: null });
  } finally {
    set({ isCheckingAuth: false });
  }
},


    // Signup
    signup: async (data) => {
        set({ isSingningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });//no user property oke?
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSingningUp: false });
        }
    },

    // Login
login: async (data) => {
  set({ isLoggingIn: true });
  try {
    const res = await axiosInstance.post("/auth/login", data);
    set({ authUser: res.data });
    toast.success("Logged in successfully");
    return true; // return success
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    return false;
  } finally {
    set({ isLoggingIn: false });
  }
},

updateProfile :async(data)=>{
  set ({isUpdatingProfile:true});
  try{
const res=await axiosInstance.put("/auth/update-profile",data);
set ({authUser:res.data});
toast.success("profile uploaded successfully");
  }
  catch(error){
console.log("error in updated profile",error);
  }
  finally{
    set({isUpdatingProfile:false})
  }
},
    // Logout
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "logout failed");
        }
    },
}));
