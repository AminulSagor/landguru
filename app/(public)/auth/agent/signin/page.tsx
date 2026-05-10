import { redirect } from "next/navigation";

export default function SigninPage() {
  // Redirect `/auth/agent/signin` to the canonical login page
  redirect("/auth/agent/login");
}
