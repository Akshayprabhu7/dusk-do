import { useState } from "react";
import { LoginForm } from "@/components/Auth/LoginForm";
import { SignupForm } from "@/components/Auth/SignupForm";
import { TaskList } from "./TaskList";
import { SettingsPage } from "./SettingsPage";
import { useToast } from "@/hooks/use-toast";

type AppState = 'login' | 'signup' | 'tasks' | 'settings';

export function TodoApp() {
  const [currentState, setCurrentState] = useState<AppState>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentState('tasks');
  };

  const handleSignupSuccess = () => {
    setIsLoggedIn(true);
    setCurrentState('tasks');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentState('login');
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });
  };

  const toggleAuthForm = () => {
    setCurrentState(currentState === 'login' ? 'signup' : 'login');
  };

  if (!isLoggedIn) {
    if (currentState === 'signup') {
      return (
        <SignupForm
          onToggleForm={toggleAuthForm}
          onSignupSuccess={handleSignupSuccess}
        />
      );
    }
    return (
      <LoginForm
        onToggleForm={toggleAuthForm}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentState === 'settings') {
    return (
      <SettingsPage
        onBack={() => setCurrentState('tasks')}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <TaskList
      onOpenSettings={() => setCurrentState('settings')}
    />
  );
}