import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center flex-col gap-5 min-h-screen min-w-screen">
        <h1 className="text-red-400 font-extrabold text-2xl">Hello from nextjs!!</h1>
        <Button className="bg-blue-200 text-black hover:bg-blue-300 h-10 w-30 ">
          Click Me
        </Button>
      </div>
    </>
  );
}
