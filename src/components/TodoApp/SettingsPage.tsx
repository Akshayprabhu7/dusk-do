import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, LogOut, Trash2, Settings, Volume2, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsPageProps {
  onBack: () => void;
  onLogout: () => void;
}

export function SettingsPage({ onBack, onLogout }: SettingsPageProps) {
  const { toast } = useToast();

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "This would delete your account permanently.",
      variant: "destructive",
    });
  };

  const handleSettingClick = (setting: string) => {
    toast({
      title: setting,
      description: `${setting} settings would open here.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/20 p-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Settings</h1>
        </div>
      </div>

      {/* Settings Options */}
      <div className="p-6 space-y-4">
        <Card className="animate-slide-up">
          <CardContent className="p-0">
            <button
              onClick={() => handleSettingClick("Themes")}
              className="w-full p-4 flex items-center gap-4 hover:bg-muted transition-colors border-b last:border-b-0"
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="flex-1 text-left font-medium">Themes</span>
            </button>
            
            <button
              onClick={() => handleSettingClick("Sounds")}
              className="w-full p-4 flex items-center gap-4 hover:bg-muted transition-colors border-b last:border-b-0"
            >
              <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <span className="flex-1 text-left font-medium">Sounds</span>
            </button>
            
            <button
              onClick={() => handleSettingClick("About Us")}
              className="w-full p-4 flex items-center gap-4 hover:bg-muted transition-colors"
            >
              <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                <Info className="w-5 h-5 text-white" />
              </div>
              <span className="flex-1 text-left font-medium">About Us</span>
            </button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleDeleteAccount}
              variant="destructive"
              className="w-full justify-start"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          onClick={onLogout}
          variant="outline"
          className="w-full h-12 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}