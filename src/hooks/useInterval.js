const useInterval = (callback, delay, enabled = true) => {
    useEffect(() => {
        if (!enabled) return;
        const interval = setInterval(callback, delay);
        return () => clearInterval(interval);
    }, [callback, delay, enabled]);
};
