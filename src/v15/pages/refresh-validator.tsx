import {redirect, RedirectType} from "next/navigation";

interface Props {
  dest: string;
}

export default async function RefreshValidator({dest}: Props) {
  redirect(`/api/auth/refresh?dest=${dest}`, RedirectType.replace);
  return null;
}
