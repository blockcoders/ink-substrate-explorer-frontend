export function getTitle(route: string) {
    let title;
    if (route.includes("transaction")) {
        title = "Transaction";
    } else if (route.includes("token")) {
        title = "Token";
    } else {
        title = "Blocks";
    }
    return title;
}
