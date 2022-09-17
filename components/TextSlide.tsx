import Background from "./Background";
import Footer from "./Footer";
import Header from "./Header";

interface TextSlideProps {
    title: string;
    bg?: string;
    children: any;
}

export default function TextSlide(props: TextSlideProps) {
    return <Background bg={props.bg}>
        <div className="flex flex-col gap-y-4 py-1 px-2 h-full">
            <Header />
            <div className="flex-grow w-7/12 mx-auto">
                <h1 className="text-2xl font-semibold">{props.title}</h1>
                {props.children}
            </div>
            <Footer />
        </div>
    </Background>;
}
