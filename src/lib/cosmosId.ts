/** Cosmos item ids may not contain / \ ? # — replace those with '-'. */
export function safeId(value: string): string {
	return value.replace(/[/\\?#]/g, "-");
}
