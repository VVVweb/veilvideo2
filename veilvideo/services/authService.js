
import { supabase } from '@/lib/supabaseClient';

// The AuthContext now handles Supabase calls directly.
// This service file can be kept for future, more complex auth-related logic
// or if you prefer to abstract Supabase calls away from the context.
// For now, we'll make it a thin wrapper or rely on context directly.

const login = async (email, password) => {
  // This function can be called from components if not using useAuth hook directly
  // For now, AuthContext.login is the primary way
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { success: false, error: error.message };
  return { success: true, user: data.user };
};

const signup = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  if (error) return { success: false, error: error.message };
  return { success: true, user: data.user };
};

const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return { success: false, error: error.message };
  return { success: true };
};

const getCurrentUser = () => {
  return supabase.auth.user();
};

const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};


export const authService = {
  login, // Can be removed if components always use useAuth().login
  signup, // Can be removed if components always use useAuth().signup
  logout, // Can be removed if components always use useAuth().logout
  getCurrentUser,
  onAuthStateChange,
};
