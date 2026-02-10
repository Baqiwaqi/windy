import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Windy - Windturbine Visualisatie" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "stylesheet",
				href: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com",
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous",
			},
		],
		scripts: [
			{
				children: `(function(){try{var t=JSON.parse(localStorage.getItem('windy-theme')||'{}');if(t.state&&t.state.theme==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark')}catch(e){document.documentElement.classList.add('dark')}})()`,
			},
		],
	}),

	shellComponent: RootDocument,
	component: RootComponent,
});

function RootComponent() {
	return <Outlet />;
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="nl">
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased bg-background text-foreground">
				{children}
				<Scripts />
			</body>
		</html>
	);
}
