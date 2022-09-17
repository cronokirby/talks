import { useRouter } from 'next/router';
import React from 'react';

function getSectionPosAndShift(slidePos: number, sectionStarts: number[]): { sectionPos: number, shift: number } {
    let sectionPos = -1;
    let shift = 0;
    for (let i = 0; i < sectionStarts.length; ++i) {
        if (slidePos < sectionStarts[i]) {
            sectionPos = i - 1;
            shift = slidePos - sectionStarts[i - 1];
            break;
        }
    }
    return { sectionPos, shift };
}

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
    readonly sectionShift: number;
    /// Set the section position.
    setSectionPos(to: number): void;
    /// Set the slide position.
    setSlidePos(to: number): void;
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
    const router = useRouter()

    const setSlidePos = (to: number) => {
        if (to < -1) {
            to = -1;
        }
        if (to >= props.startValue.slideCount) {
            to = props.startValue.slideCount - 1;
        }
        router.query.slide = `${to}`;
        router.push(router, undefined, { shallow: true });
    };

    const value = React.useMemo<TalkContextValue>(() => {
        const slidePos = router.query.slide !== undefined ? Number(router.query.slide) : -1;
        const { sectionPos, shift } = getSectionPosAndShift(slidePos, props.startValue.sectionStarts);
        return {
            sectionPos,
            sectionShift: shift,
            setSectionPos: (x: number) => setSlidePos(props.startValue.sectionStarts[x]),
            slidePos,
            setSlidePos,
            ...props.startValue
        };
    }, [props.startValue, router.asPath]);

    return <TalkContext.Provider value={value} {...props} />;
}