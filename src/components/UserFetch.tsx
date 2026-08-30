import PostFetch from "@/components/PostFetch";
import UserForm from "@/components/UserForm";

export default async function UserFetch({ name }: { name: string }) {
  return (
    <>
      <h1>UserFetch Component: {name}</h1>
      <UserForm name="userForm">
        <PostFetch name="postFetch" />
      </UserForm>
    </>
  );
}
