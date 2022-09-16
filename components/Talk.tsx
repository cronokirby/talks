import React from "react";
import { TalkProvider, useTalkContext } from "./contexts/talk";
import Title from "./Title";

function getSectionAndSlideCount(children: any): { section: number, slide: number } {
    let section = 0;
    let slide = 0;
    React.Children.forEach(children, (child) => {
        section += 1;
        slide += React.Children.count(child.props.children);
    });
    return { section, slide };
}

function TalkContainer(props: any) {
    const ctx = useTalkContext();

    return <Title {...ctx} />
}

export interface TalkProps {
    title: string;
    author: string;
    date: string;
    social: string;
    socialLink: string;
    children: any;
}

export default function Talk(props: TalkProps) {
    const { section, slide } = getSectionAndSlideCount(props.children);
    const value = {
        title: props.title,
        author: props.author,
        date: new Date(props.date),
        social: props.social,
        socialLink: props.socialLink,
        sectionCount: section,
        slideCount: slide
    };
    return (<TalkProvider value={value}>
        <TalkContainer>
            {props.children}
        </TalkContainer>
    </TalkProvider>);
}

