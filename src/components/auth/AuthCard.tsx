import { Tabs } from "./Tabs";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { SocialButtons } from "./SocialButtons";
import { useState } from "react";

export const AuthCard = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [prefillEmail, setPrefillEmail] = useState("");
  const handleRegistered = (email: string) => {
    setPrefillEmail(email);     // 👉 truyền email
    setActiveTab("login");       // 👉 chuyển sang tab login
  };
  return (
    <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl">
      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "login" ? <LoginForm prefillEmail={prefillEmail} /> : <RegisterForm onSuccess={handleRegistered} />}

      {/* <SocialButtons /> */}
    </div>
  );
};
