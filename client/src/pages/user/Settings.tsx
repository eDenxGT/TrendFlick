import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalInfoForm from "@/components/user/settings/PersonalInfoForm";
import PasswordChangeForm from "@/components/user/settings/PasswordChangeForm";
import PreferencesForm from "@/components/user/settings/PreferencesForm";
import { useGetUserDetails } from "@/hooks/user/useGetUserDetails";
import type { User } from "@/types/User";
import { updateUserDetails } from "@/services/userService";
import { useToaster } from "@/hooks/ui/useToaster";

const Settings = () => {
  const { data: userData, refetch } = useGetUserDetails();

  const { successToast, errorToast } = useToaster();

  const handleUserUpdate = async (updatedUser: Partial<User>) => {
    try {
      const response = await updateUserDetails(updatedUser);
      if(response.success){
        successToast(response.message);
        refetch();
      }
    } catch (error: any) {
      errorToast(error?.response?.data?.message || "Something went wrong");
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#121826] p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-[#94a3b8]">Manage your account and preferences</p>
        </div>

        <Card className="border-[#164e63]/30 backdrop-blur-sm bg-[#0f1729]/80 shadow-lg">
          <CardHeader className="border-b border-[#164e63]/30">
            <CardTitle className="text-white text-2xl">
              Account Settings
            </CardTitle>
            <CardDescription className="text-[#94a3b8]">
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-[#1e293b]/50 border border-[#164e63]/30">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-[#06b6d4] data-[state=active]:text-white text-[#94a3b8]"
                >
                  Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="data-[state=active]:bg-[#06b6d4] data-[state=active]:text-white text-[#94a3b8]"
                >
                  Password
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="data-[state=active]:bg-[#06b6d4] data-[state=active]:text-white text-[#94a3b8]"
                >
                  Preferences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <PersonalInfoForm
                  user={userData?.data.user || ({} as User)}
                  onUpdate={handleUserUpdate}
                />
              </TabsContent>

              <TabsContent value="password" className="mt-6">
                <PasswordChangeForm />
              </TabsContent>

              <TabsContent value="preferences" className="mt-6">
                <PreferencesForm
                  user={userData?.data.user || ({} as User)}
                  onUpdate={handleUserUpdate}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
