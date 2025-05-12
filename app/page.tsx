import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/utils/auth";

export default async function Home() {
	const heads = await headers();

	const session = await auth.api.getSession({
		headers: heads,
	});

	if (!session) {
		redirect("/login");
	}

	return <div>logged in as {session.user.email}</div>;
}
