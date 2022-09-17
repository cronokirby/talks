import React from 'react';

const SectionContext = React.createContext<string | null>(null);

export function useSectionContext(): string {
    const ctx = React.useContext(SectionContext);
    if (!ctx) {
        throw new Error('useSectionContext must be used within a SectionProvider.');
    }
    return ctx;
}

export function SectionProvider(props: any) {
    return <SectionContext.Provider value={props.title} {...props} />;
}
