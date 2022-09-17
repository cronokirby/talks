import React from 'react';

type Callback = () => boolean;

interface KeyContextValue {
    addOnForward(priority: boolean, cb: Callback): void;
    addOnBack(priority: boolean, cb: Callback): void;
    removeOnForward(cb: Callback): void;
    removeOnBack(cb: Callback): void;
}

const KeyContext = React.createContext<KeyContextValue | null>(null);

export function useKeyContext(): KeyContextValue {
    const ctx = React.useContext(KeyContext);
    if (!ctx) {
        throw new Error('useKeyContext must be used within a KeyProvider.');
    }
    return ctx;
}

export function KeyProvider(props: any) {
    const [forwards, setForwards] = React.useState<Callback[]>([]);
    const [backwards, setBackwards] = React.useState<Callback[]>([]);

    const value = {
        addOnForward: (p: boolean, cb: Callback) => setForwards(cbs => p ? [cb, ...cbs] : [...cbs, cb]),
        addOnBack: (p: boolean, cb: Callback) => setBackwards(cbs => p ? [cb, ...cbs] : [...cbs, cb]),
        removeOnForward: (cb: Callback) => setForwards(cbs => cbs.filter(x => x != cb)),
        removeOnBack: (cb: Callback) => setBackwards(cbs => cbs.filter(x => x != cb)),
    }

    const onKeyPress = (event: KeyboardEvent) => {
        if (event.key === ' ' || event.key == 's' || event.key == 'ArrowDown') {
            for (const cb of forwards) {
                if (cb()) {
                    break;
                }
            }
            return;
        }
        if (event.key == 'w' || event.key == 'ArrowUp') {
            for (const cb of backwards) {
                if (cb()) {
                    break;
                }
            }
            return;
        }
    };

    React.useEffect(() => {
        window.addEventListener('keydown', onKeyPress);

        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [forwards, backwards]);

    return <KeyContext.Provider value={value} {...props} />;
}