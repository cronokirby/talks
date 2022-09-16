import React from "react";

export default function SlideContainer(props: any) {
    const slides = React.useMemo(() => {
        let slides: any[] = [];
        React.Children.map(props.children, (child) => slides.push(child));
        console.log(slides);
        return slides;
    }, [props.children])

    const [counter, setCounter] = React.useState(0);

    return <div onClick={() => setCounter(c => (c + 1) % slides.length)}>{slides[counter]}</div>;
}

