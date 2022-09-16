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
    /// The start position of each section
    readonly sectionStarts: number[];
    /// The total number of slides.
    readonly slideCount: number;
}

export interface TalkContextValue extends TalkContextStaticValues {
    readonly sectionPos: number;
    readonly slidePos: number;
    /// Set the section position.
    setSectionPos(to: number): void;
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
    const [slidePos, setSlidePos] = React.useState(-1);

    const value = React.useMemo<TalkContextValue>(() => {
        return {
            sectionPos: props.startValue.sectionStarts.findIndex((x: number) => x > slidePos) - 1,
            setSectionPos: (x: number) => setSlidePos(props.startValue.sectionStarts[x]),
            slidePos,
            setSlidePos,
            ...props.startValue
        };
    }, [props.startValue, slidePos]);

    return <TalkContext.Provider value={value} {...props} />;
}