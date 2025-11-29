import AppHeader from "@/components/AppHeader";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppHeader />
      <div className="flex-1">{children}</div>;
    </>
  );
};

export default layout;
