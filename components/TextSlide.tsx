import Background from "./Background";
import Footer from "./Footer";
import Header from "./Header";
import { motion, AnimatePresence } from 'framer-motion';
import { useTalkContext } from "./contexts/talk";

interface TextSlideProps {
    title: string;
    bg?: string;
    children: any;
}

export default function TextSlide(props: TextSlideProps) {
    const ctx = useTalkContext();

    return <Background bg={props.bg}>
        <div className="flex flex-col gap-y-4 py-1 px-2 h-full">
            <Header />
            <div className="flex-grow w-7/12 mx-auto">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={ctx.slidePos}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.2 }}
                        className=""
                    >
                        <h1 className="text-2xl font-semibold">{props.title}</h1>
                        {props.children}
                    </motion.div>
                </AnimatePresence>
            </div>

            <Footer />
        </div>
    </Background>;
}
