import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	approveRequestFn,
	denyRequestFn,
	getSession,
	listPendingRequests,
	logoutFn,
	requestAdminFn,
} from "@/server/rpc";

export const Route = createFileRoute("/admin")({
	component: Admin,
	loader: async () => {
		const session = await getSession();
		const pending = session.role === "admin" ? await listPendingRequests() : [];
		return { session, pending };
	},
});

function Admin() {
	const router = useRouter();
	const { session, pending } = Route.useLoaderData();

	const onRequestAdmin = async () => {
		await requestAdminFn();
		router.invalidate();
	};
	const onLogout = async () => {
		await logoutFn();
		router.invalidate();
	};
	const onApprove = async (sub: string) => {
		await approveRequestFn({ data: { sub } });
		router.invalidate();
	};
	const onDeny = async (sub: string) => {
		await denyRequestFn({ data: { sub } });
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

			{!session.user ? (
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
						<p className="font-medium">
							{session.user.name ?? session.user.email}
						</p>
						<p className="text-muted-foreground">{session.user.email}</p>
						<p className="mt-2">
							Rol:{" "}
							<span className="font-medium">
								{session.role === "admin" ? "Beheerder" : "Gebruiker"}
							</span>
						</p>
					</div>

					{session.role === "admin" ? (
						<div className="space-y-2">
							<h2 className="text-sm font-medium">Aanvragen</h2>
							{pending.length === 0 ? (
								<p className="text-xs text-muted-foreground">
									Geen openstaande aanvragen.
								</p>
							) : (
								pending.map((p) => (
									<div
										key={p.sub}
										className="flex items-center justify-between gap-2 rounded-lg border border-border p-2.5 text-sm"
									>
										<div className="min-w-0">
											<p className="truncate font-medium">
												{p.name ?? p.email}
											</p>
											<p className="truncate text-xs text-muted-foreground">
												{p.email}
											</p>
										</div>
										<div className="flex shrink-0 gap-1">
											<Button
												size="sm"
												className="h-7"
												onClick={() => onApprove(p.sub)}
											>
												Goedkeuren
											</Button>
											<Button
												size="sm"
												variant="ghost"
												className="h-7"
												onClick={() => onDeny(p.sub)}
											>
												Afwijzen
											</Button>
										</div>
									</div>
								))
							)}
						</div>
					) : session.request?.status === "pending" ? (
						<p className="text-sm text-muted-foreground">
							Je aanvraag voor beheerderstoegang is in behandeling.
						</p>
					) : session.request?.status === "denied" ? (
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
