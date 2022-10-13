export function getTitle(route: string) {
    console.log(route);
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
