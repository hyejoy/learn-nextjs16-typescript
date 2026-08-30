export default function UserForm({
  name,
  children,
}: {
  name: string;
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <h1>UserForm Component: {name}</h1>
      {children}
    </>
  );
}
