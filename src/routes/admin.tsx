import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getRequest } from "@tanstack/react-start/server";
import { Button } from "@/components/ui/button";
import { requestAdmin as applyRequestAdmin } from "@/lib/roles";
import { getRole, getSessionUser, loadUser } from "@/server/auth";
import { container } from "@/server/cosmos";
import { SESSION_COOKIE } from "@/server/session";

const getMe = createServerFn({ method: "GET" }).handler(async () => {
	const user = getSessionUser(getRequest());
	const role = await getRole(user);
	const stored = user ? await loadUser(user.sub) : null;
	return { user, role, request: stored?.request ?? null };
});

const requestAdminFn = createServerFn({ method: "POST" }).handler(async () => {
	const user = getSessionUser(getRequest());
	if (!user) throw new Error("Unauthorized");
	const stored = await loadUser(user.sub);
	const base =
		stored ?? ({ id: user.sub, email: user.email, role: "user" } as const);
	const updated = applyRequestAdmin(base, new Date().toISOString());
	await container("users").items.upsert({ ...updated, id: user.sub });
	return { request: updated.request };
});

const logoutFn = createServerFn({ method: "POST" }).handler(async () => {
	deleteCookie(SESSION_COOKIE, { path: "/" });
	return { ok: true };
});

export const Route = createFileRoute("/admin")({
	component: Admin,
	loader: async () => await getMe(),
});

function Admin() {
	const router = useRouter();
	const me = Route.useLoaderData();

	const onRequestAdmin = async () => {
		await requestAdminFn();
		router.invalidate();
	};

	const onLogout = async () => {
		await logoutFn();
		router.invalidate();
	};

	return (
		<div className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-6 py-16">
			<div>
				<h1 className="text-2xl font-semibold">Admin</h1>
				<p className="text-sm text-muted-foreground">
					Windpark-analyse — beheerdersomgeving
				</p>
			</div>

			{!me.user ? (
				<div className="space-y-3">
					<p className="text-sm text-muted-foreground">
						Log in om beheerfuncties te gebruiken.
					</p>
					<Button asChild className="w-full">
						<a href="/api/auth/google">Inloggen met Google</a>
					</Button>
				</div>
			) : (
				<div className="space-y-4">
					<div className="rounded-lg border border-border p-4 text-sm">
						<p className="font-medium">{me.user.name ?? me.user.email}</p>
						<p className="text-muted-foreground">{me.user.email}</p>
						<p className="mt-2">
							Rol:{" "}
							<span className="font-medium">
								{me.role === "admin" ? "Beheerder" : "Gebruiker"}
							</span>
						</p>
					</div>

					{me.role === "admin" ? (
						<div className="rounded-lg border border-primary/40 bg-accent/40 p-4 text-sm">
							<p className="font-medium">Beheerderstoegang actief</p>
							<p className="mt-1 text-muted-foreground">
								Aanvragen goedkeuren, presets publiceren en eigenaren-export
								komen hier.
							</p>
						</div>
					) : me.request?.status === "pending" ? (
						<p className="text-sm text-muted-foreground">
							Je aanvraag voor beheerderstoegang is in behandeling.
						</p>
					) : me.request?.status === "denied" ? (
						<div className="space-y-2">
							<p className="text-sm text-muted-foreground">
								Je aanvraag is afgewezen.
							</p>
							<Button
								onClick={onRequestAdmin}
								variant="outline"
								className="w-full"
							>
								Opnieuw aanvragen
							</Button>
						</div>
					) : (
						<Button onClick={onRequestAdmin} className="w-full">
							Beheerderstoegang aanvragen
						</Button>
					)}

					<Button onClick={onLogout} variant="ghost" className="w-full">
						Uitloggen
					</Button>
				</div>
			)}
		</div>
	);
}
