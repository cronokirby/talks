import Background from "./Background";

interface TextSlideProps {
    title: string;
    bg?: string;
    children: any;
}

export default function TextSlide(props: TextSlideProps) {
    return <Background bg={props.bg}>
        {props.children}
    </Background>;
}
