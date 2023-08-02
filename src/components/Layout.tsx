const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-start h-full mt-40">
      {children}
    </div>
  );
};

export default Layout;
