import { SignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function Page() {
   
  return <SignIn path="/sign-in" />;
}