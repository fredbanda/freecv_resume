

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
