import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import robotMascot from "@/assets/robot-mascot.png";

interface LoginFormProps {
  onToggleForm: () => void;
  onLoginSuccess: () => void;
}

export function LoginForm({ onToggleForm, onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "Error",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: "Social login would be implemented here.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-slide-up">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-24 h-24 animate-float">
            <img src={robotMascot} alt="Robot Mascot" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold">To Do List</CardTitle>
          <CardDescription>Welcome To Do List</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="xyz@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Forgot Password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12" 
              variant="task"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login Now"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">other ways to login</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="social"
              className="w-full h-12"
              onClick={() => handleSocialLogin("Google")}
            >
              <div className="w-5 h-5 bg-red-500 rounded-full mr-2"></div>
              Continue with Google
            </Button>
            <Button
              variant="social"
              className="w-full h-12"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <div className="w-5 h-5 bg-blue-600 rounded-full mr-2"></div>
              Continue with Facebook
            </Button>
            <Button
              variant="social"
              className="w-full h-12"
              onClick={() => handleSocialLogin("Apple")}
            >
              <div className="w-5 h-5 bg-gray-800 rounded-full mr-2"></div>
              Continue with Apple
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={onToggleForm}
                className="text-foreground font-medium hover:underline"
              >
                Signup
              </button>
              {" "}or{" "}
              <button
                onClick={onToggleForm}
                className="text-foreground font-medium hover:underline"
              >
                Create an account
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}