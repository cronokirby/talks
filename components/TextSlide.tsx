interface TextSlideProps {
    title: string;
    children: any;
}

export default function TextSlide(props: TextSlideProps) {
    return <div>{props.children}</div>
}