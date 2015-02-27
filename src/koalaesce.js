export function koalaesce(base, ...steps) {
    return steps.reduce((prev, cur) => {
            if (prev && prev.hasOwnProperty(cur)) {
            return prev[cur];
        } else {
            throw new Error("Missing link at " + cur);
        }
    }, base);
}
