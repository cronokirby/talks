import Background from "./Background";

interface TextSlideProps {
    title: string;
    bg?: string;
    children: any;
}

export default function TextSlide(props: TextSlideProps) {
    return <Background bg={props.bg}>
        <div className="w-7/12 mx-auto gap-y-6 flex flex-col">
            <h1 className="text-2xl font-semibold">{props.title}</h1>
            {props.children}
        </div>
    </Background>;
}
