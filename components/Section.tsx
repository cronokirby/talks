import React from 'react';
import { SectionProvider } from "./contexts/section";
import { useTalkContext } from './contexts/talk';

interface SectionProps {
    title: string;
    children: any;
}

export default function Section(props: SectionProps) {
    const ctx = useTalkContext();

    const slides = React.useMemo(() => {
        const slides: any[] = [];
        React.Children.forEach(props.children, child => {
            slides.push(child);
        });
        return slides;
    }, [props.children]);

    return <SectionProvider title={props.title}>
        {slides[ctx.sectionShift]}
    </SectionProvider>;
}
