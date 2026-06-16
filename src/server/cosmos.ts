import { type Container, CosmosClient, type Database } from "@azure/cosmos";
import { getEnv } from "@/server/env";

/** The four containers. Owner data (parcels/owners) is admin-gated at the API. */
export const CONTAINERS = {
	users: "users",
	presets: "presets",
	parcels: "parcels",
	owners: "owners",
} as const;

export type ContainerName = (typeof CONTAINERS)[keyof typeof CONTAINERS];

let client: CosmosClient | null = null;
let database: Database | null = null;

function getClient(): CosmosClient {
	if (!client) client = new CosmosClient(getEnv().COSMOS_CONNECTION_STRING);
	return client;
}

function getDatabase(): Database {
	if (!database) database = getClient().database(getEnv().COSMOS_DATABASE);
	return database;
}

/** Accessor for a container. Lazily reuses one client/database instance. */
export function container(name: ContainerName): Container {
	return getDatabase().container(name);
}

/**
 * Create the database and all containers if they do not yet exist. Containers
 * are partitioned on `/id`. Safe to call repeatedly (used by the import script
 * and first-boot setup).
 */
export async function ensureContainers(): Promise<void> {
	const { database: db } = await getClient().databases.createIfNotExists({
		id: getEnv().COSMOS_DATABASE,
	});
	for (const id of Object.values(CONTAINERS)) {
		await db.containers.createIfNotExists({
			id,
			partitionKey: { paths: ["/id"] },
		});
	}
}
