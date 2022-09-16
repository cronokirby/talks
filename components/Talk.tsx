import React from "react";
import { TalkProvider, useTalkContext } from "./contexts/talk";
import Title from "./Title";

function getSectionStartsAndSlideCount(children: any): { sectionStarts: number[], slide: number } {
    let sectionStarts = [0];
    let slide = 0;
    React.Children.forEach(children, (child) => {
        const count = React.Children.count(child.props.children);
        sectionStarts.push(slide + count);
        slide += count;
    });
    return { sectionStarts, slide };
}

function TalkContainer(props: any) {
    const ctx = useTalkContext();
    console.log(ctx.slidePos);
    if (ctx.sectionPos < 0) {
        return <Title {...ctx} />
    }
    return <div>{ctx.sectionPos}</div>
}

function TalkControls(props: any) {
    const ctx = useTalkContext();

    const onClick = () => {
        ctx.setSlidePos(x => x + 1);
    };

    return <div onClick={onClick}>
        {props.children}
    </div>
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
    const { sectionStarts, slide } = getSectionStartsAndSlideCount(props.children);
    const startValue = {
        title: props.title,
        author: props.author,
        date: new Date(props.date),
        social: props.social,
        socialLink: props.socialLink,
        sectionStarts: sectionStarts,
        slideCount: slide
    };
    return (<TalkProvider startValue={startValue}>
        <TalkControls>
            <TalkContainer>
                {props.children}
            </TalkContainer>
        </TalkControls>
    </TalkProvider>);
}

