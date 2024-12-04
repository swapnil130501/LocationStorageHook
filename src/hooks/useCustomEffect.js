import { useRef } from "react";

function useCustomEffect(cb, dependencies) {
    const isFirstRender = useRef(true);
    const prevDependencies = useRef([]);

    // Run the callback on the first render
    if (isFirstRender.current) {
        isFirstRender.current = false;
        cb();
        prevDependencies.current = dependencies || [];
        return;
    }

    // Check if dependencies have changed
    const dependenciesChanged =
        !dependencies ||
        dependencies.length !== prevDependencies.current.length ||
        dependencies.some((dep, i) => dep !== prevDependencies.current[i]);

    if (dependenciesChanged) {
        cb();
        prevDependencies.current = dependencies || [];
    }
}

export default useCustomEffect;
