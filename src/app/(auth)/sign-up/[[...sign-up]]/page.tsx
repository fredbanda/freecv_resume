import { SignUp } from "@clerk/nextjs";

export default function Page() {
       return (
           <div className="flex flex-col items-center justify-center h-screen mt-12">
           <SignUp />;
           </div>
       
       )
}