import Background from "./Background";
import Footer from "./Footer";
import Header from "./Header";
import { useTalkContext } from "./contexts/talk";

interface TextSlideProps {
    bg?: string;
    children: any;
}

export default function TextSlide(props: TextSlideProps) {
    const ctx = useTalkContext();

    return <Background bg={props.bg}>
        <div className="flex flex-col gap-y-4 py-1 px-2 h-full">
            <Header />
            <div className="flex-grow w-7/12 mx-auto">
                {props.children}
            </div>
            <Footer />
        </div>
    </Background >;
}
