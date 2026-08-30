import ClientWrapper from "@/components/ClientWrapper";
import DataFetch from "@/components/DataFetch";

export default function Page() {
  return (
    <>
      <h1>Page Component</h1>
      <ClientWrapper name="client">
        <DataFetch name="fetch" />
      </ClientWrapper>
    </>
  );
}
