import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { isAxiosError } from "axios";
import toast from 'react-hot-toast';

interface formDataType {
  email: string,
  fullname?: string,
  password: string
}

interface  updateProfileType {
  profilePic: string | ArrayBuffer | undefined
}

interface AuthState {
  authUser: any | null;
  isCheckingAuth: boolean;
  isSigningUp: boolean;
  isLoggingIn: boolean; 
  isUpdatingProfile: boolean; 
  onlineUsers: any[];
  checkAuth: () => void;
  signUp: (data: formDataType)=> void;
  logIn: (data: formDataType)=> void;
  updateProfile: (data: updateProfileType)=> void;
  logOut: ()=> void;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false, 
  isUpdatingProfile: false, 

  checkAuth: async () => {
    try{
       const res = await axiosInstance.get('/auth/check-auth');
       set({authUser: res.data});
    }
    catch(e) {
    console.log(`Error in check auth: `, e);
        set({authUser: null});
    }
    finally{
        set({isCheckingAuth: false});
    }
  },

  signUp: async (data)=> {
    try{
      set({isSigningUp: true});
      const res = await axiosInstance.post('/auth/signup', data);
      set({authUser: res.data})
      toast.success("Account created successfully");
    }
    catch(err: unknown) {
      if(isAxiosError(err) && err.response?.data?.message) {
        console.log(`Error: `, err);
        toast.error(err.response.data.message);
      }
      else{
        console.log('An unkown err: ', err);
        toast.error("Something went wrong");
      }
      
    }
    finally{
      set({isSigningUp: false});
    }
  },

  logIn: async (data)=> {
    try{
      set({isLoggingIn: true});
      const res = await axiosInstance.post('/auth/login', data);
      set({authUser: res.data});
      toast.success("Loggined Successfully");
    } catch(err: unknown) {
      if(isAxiosError(err) && err.response?.data.message) {
        toast.error(err.response.data.message);
        console.log("Error: ", err);
      }
      else{
      console.log("Unkown Error: ", err);
      }
    } finally {
      set({isLoggingIn: false});
    }
  },

  logOut: async () => {
    try{
    const res = await axiosInstance.post('/auth/signout');
    set({authUser: null});
    toast.success(res.data.message);
    }
    catch(err: unknown) {
      if(isAxiosError(err) && err.response?.data.message) {
        console.log("Error: ", err.response.data.message);
      }
      else{
        console.log("Something went wrong: ", err);
      }
    }
  },

  updateProfile: async (data) => {
    try{
      set({isUpdatingProfile: true});
      const res = await axiosInstance.put('/auth/update-profile', data);
      set({authUser: res.data })
      toast.success("Profile Updated successfully");
    }
    catch(err: unknown)  {
      if(isAxiosError(err) && err.response?.data.message) {
        toast.error(err.response.data.message);
      }
      else{ 
      console.log('Unknow error: ', err );
      }
    }
    finally{
      set({isUpdatingProfile: false});
    }
  }
,
onlineUsers: []

}));
