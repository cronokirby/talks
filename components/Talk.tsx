import React from "react";
import { KeyProvider, useKeyContext } from "./contexts/key";
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

    const sections = React.useMemo(() => {
        const sections: any[] = [];
        React.Children.forEach(props.children, child => {
            sections.push(child);
        });
        return sections;
    }, [props.children]);

    if (ctx.sectionPos < 0) {
        return <Title {...ctx} />
    }
    return <React.Fragment>
        {sections[ctx.sectionPos]}
    </React.Fragment>;
}

function TalkControls(props: any) {
    const ctx = useTalkContext();
    const keys = useKeyContext();

    const onForward = () => {
        console.log('forward outer');
        ctx.setSlidePos(ctx.slidePos + 1);
        return true;
    }

    const onBack = () => {
        ctx.setSlidePos(ctx.slidePos - 1);
        return true;
    }

    React.useEffect(() => {
        keys.addOnForward(false, onForward);
        keys.addOnBack(false, onBack);

        return () => {
            keys.removeOnForward(onForward);
            keys.removeOnBack(onBack);
        }
    }, [ctx.slidePos, ctx.setSlidePos]);

    const onKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === ' ' || event.key == 's' || event.key == 'ArrowDown') {
            ctx.setSlidePos(ctx.slidePos + 1);
            return;
        }
        if (event.key == 'w' || event.key == 'ArrowUp') {
            ctx.setSlidePos(ctx.slidePos - 1);
            return;
        }
    };

    return <div onClick={onForward} onKeyDown={onKeyPress} tabIndex={0} className="select-none">
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
    return <KeyProvider>
        <TalkProvider startValue={startValue}>
            <TalkControls>
                <TalkContainer>
                    {props.children}
                </TalkContainer>
            </TalkControls>
        </TalkProvider>
    </KeyProvider>;
}

