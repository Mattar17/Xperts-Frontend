import { Bell, Pencil, CircleUser } from "lucide-react";

export default function UserSpace({ isWritingPost }) {
  return (
    <>
      <button onClick={isWritingPost}>
        <Pencil color="white" />
      </button>
      <button>
        <Bell color="white" />
      </button>
      <button>
        <CircleUser color="white" />
      </button>
    </>
  );
}
