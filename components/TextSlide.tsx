import React from "react";
import Background from "./Background";
import Footer from "./Footer";
import Header from "./Header";

interface TextSlideProps {
    size?: string;
    bg?: string;
    reveal: boolean;
    children: any;
}

export default function TextSlide(props: TextSlideProps) {
    const count = React.Children.count(props.children);
    const [revealPos, setRevealPos] = React.useState(0);

    const onClick = (event: React.MouseEvent) => {
        if (revealPos >= count - 1) {
            return;
        }
        setRevealPos(x => x + 1);
        event.stopPropagation();
    };

    const onKeyPress = (event: React.KeyboardEvent) => {
        console.log('woah mam!');
        if (revealPos >= count - 1) {
            return;
        }
        if (event.key !== ' ' && event.key !== 's' && event.key !== 'ArrowDown') {
            return;
        }
        setRevealPos(x => x + 1);
        event.stopPropagation();
    };

    return <Background bg={props.bg}>
        <div className="flex flex-col py-1 px-2 h-full" onClick={onClick} onKeyDown={onKeyPress}>
            <Header />
            <div className={`flex-grow w-7/12 mx-auto ${props.size === 'vsmall' ? 'text-xxs' : props.size === 'small' ? 'text-xs' : ''}`}>
                {
                    React.Children.map(props.children, (child, i) => <div style={!props.reveal || i <= revealPos ? {} : { display: 'none' }}>{child}</div>)
                }
            </div>
            <Footer />
        </div>
    </Background >;
}
