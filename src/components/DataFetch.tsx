import UserFetch from "@/components/UserFetch";

export default async function DataFetch({ name }: { name: string }) {
  return (
    <>
      <h1>DataFetch Component_{name}</h1>
      <UserFetch name="userFetch" />
    </>
  );
}
