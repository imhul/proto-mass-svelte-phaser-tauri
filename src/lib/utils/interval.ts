let interval: NodeJS.Timeout | undefined;

export function start(callback: () => void) {
    interval = setInterval(() => {
        callback();
    }, 16.6667);
}

export function stop() {
    clearInterval(interval);
}
