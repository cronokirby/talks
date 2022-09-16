import React from 'react';

export interface TalkContextStaticValues {
    /// The title of the talk.
    readonly title: string;
    /// The author of the talk.
    readonly author: string;
    /// The social handle of the author.
    readonly social: string;
    /// The link for social media.
    readonly socialLink: string;
    /// The date of the talk.
    readonly date: Date;
    /// The total number of sections.
    readonly sectionCount: number;
    /// The total number of slides.
    readonly slideCount: number;

}

export interface TalkContextValue extends TalkContextStaticValues {
    readonly sectionName: string;
    readonly sectionPos: number;
    readonly slidePos: number;
    /// Modify the current section name.
    setSectionName(name: string): void;
    /// Set the section position.
    setSectionPos(f: (current: number) => number): void;
    /// Set the slide position.
    setSlidePos(f: (current: number) => number): void;
}

const TalkContext = React.createContext<TalkContextValue | null>(null);

export function useTalkContext(): TalkContextValue {
    const ctx = React.useContext(TalkContext);
    if (!ctx) {
        throw new Error('useTalkContext must be used within a TalkProvider.');
    }
    return ctx;
}

export function TalkProvider(props: any) {
    const [sectionName, setSectionName] = React.useState("");
    const [sectionPos, setSectionPos] = React.useState(0);
    const [slidePos, setSlidePos] = React.useState(0);

    const value = React.useMemo<TalkContextValue>(() => {
        return {
            sectionName,
            setSectionName,
            sectionPos,
            setSectionPos,
            slidePos,
            setSlidePos,
            ...props.value
        };
    }, [props.value, sectionName, sectionPos, slidePos]);

    return <TalkContext.Provider value={value} {...props} />;
}