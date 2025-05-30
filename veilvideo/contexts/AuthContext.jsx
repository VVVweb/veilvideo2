
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { auth, db } from '@/utils/supabase';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

const DEV_MODE_SKIP_AUTH = false; // Disable dev mode in production

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(!DEV_MODE_SKIP_AUTH); 
  const { toast } = useToast();

  const fetchUserProfile = useCallback(async (userId) => {
    if (DEV_MODE_SKIP_AUTH || !userId) return null;
    try {
      const { data, error } = await db.getProfile(userId);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      return null;
    }
  }, []);

  useEffect(() => {
    if (DEV_MODE_SKIP_AUTH) {
      const mockUser = {
        id: 'mock-user-id',
        email: 'dev@example.com',
        // Add other user properties if your app uses them
      };
      const mockProfile = {
        full_name: 'Dev User',
        anonymous_id: 'anon-dev-user',
        // Add other profile properties
      };
      setUser(mockUser);
      setProfile(mockProfile);
      setLoading(false);
      return;
    }

    const getSession = async () => {
      setLoading(true);
      const { session, error } = await auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
        setLoading(false);
        return;
      }

      if (session?.user) {
        setUser(session.user);
        const userProfile = await fetchUserProfile(session.user.id);
        setProfile(userProfile);
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = auth.onAuthStateChange(
      async (_event, session) => {
        if (DEV_MODE_SKIP_AUTH) return;
        setLoading(true);
        setUser(session?.user ?? null);
        if (session?.user) {
          const userProfile = await fetchUserProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      if (!DEV_MODE_SKIP_AUTH) {
        authListener?.subscription?.unsubscribe();
      }
    };
  }, [fetchUserProfile]);


  const login = useCallback(async (email, password) => {
    if (DEV_MODE_SKIP_AUTH) {
      toast({ title: "Dev Mode", description: "Login is disabled in development mode." });
      return user; 
    }
    setLoading(true);
    const { data, error } = await auth.signIn({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Login Failed", description: error.message, variant: "destructive" });
      return null;
    }
    if (data.user) {
      const userProfile = await fetchUserProfile(data.user.id);
      setProfile(userProfile);
      toast({ title: "Login Successful", description: "Welcome back!" });
    }
    return data.user;
  }, [toast, fetchUserProfile, user]);

  const signup = useCallback(async (email, password, fullName) => {
    if (DEV_MODE_SKIP_AUTH) {
      toast({ title: "Dev Mode", description: "Signup is disabled in development mode." });
      return user;
    }
    setLoading(true);
    const { data, error } = await auth.signUp({
      email,
      password,
      full_name: fullName
    });
    setLoading(false);
    if (error) {
      toast({ title: "Signup Failed", description: error.message, variant: "destructive" });
      return null;
    }
    if (data.user) {
      const userProfile = await fetchUserProfile(data.user.id);
      setProfile(userProfile);
      toast({ title: "Signup Successful", description: "Welcome! Please check your email to confirm your account." });
    }
    return data.user;
  }, [toast, fetchUserProfile, user]);

  const logout = useCallback(async () => {
    if (DEV_MODE_SKIP_AUTH) {
      toast({ title: "Dev Mode", description: "Logout is disabled in development mode." });
      return true;
    }
    setLoading(true);
    const { error } = await auth.signOut();
    setLoading(false);
    if (error) {
      toast({ title: "Logout Failed", description: error.message, variant: "destructive" });
      return false;
    }
    setUser(null);
    setProfile(null);
    toast({ title: "Logged Out", description: "You have been successfully logged out." });
    return true;
  }, [toast]);

  const value = {
    user,
    profile,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: DEV_MODE_SKIP_AUTH ? true : !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
