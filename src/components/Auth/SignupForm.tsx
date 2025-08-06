import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import robotMascot from "@/assets/robot-mascot.png";

interface SignupFormProps {
  onToggleForm: () => void;
  onSignupSuccess: () => void;
}

export function SignupForm({ onToggleForm, onSignupSuccess }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate signup
    setTimeout(() => {
      if (email && password) {
        toast({
          title: "Account Created!",
          description: "Welcome to your new to-do app.",
        });
        onSignupSuccess();
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

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-slide-up">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-24 h-24 animate-float">
            <img src={robotMascot} alt="Robot Mascot" className="w-full h-full object-contain" />
          </div>
          <CardTitle className="text-2xl font-bold">To Do List</CardTitle>
          <CardDescription>Create account :</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSignup} className="space-y-4">
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
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12" 
              variant="task"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Submit"}
            </Button>
          </form>

          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img src={robotMascot} alt="Robot" className="w-8 h-8" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Conquer your day, one task at a time
            </p>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={onToggleForm}
                className="text-foreground font-medium hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}