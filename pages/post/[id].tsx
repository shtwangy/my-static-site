import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function BookingDetail() {
  const router = useRouter();
  const [id, setId] = useState("");

  useEffect(() => {
    const id = router.query.id;
    if (typeof id === "string") setId(id);
  }, []);

  return <div>{id}</div>;
}
