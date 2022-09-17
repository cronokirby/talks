import Background from "./Background";
import Footer from "./Footer";
import Header from "./Header";
import { motion, AnimatePresence } from 'framer-motion';
import { useTalkContext } from "./contexts/talk";

interface SplashProps {
    bg?: string;
    children: any;
}

export default function Splash(props: SplashProps) {
    return <Background bg={props.bg}>
        <div className="font-bold w-10/12 h-full mx-auto text-4xl text-center flex flex-col justify-center items-center">
            {props.children}
        </div>
    </Background>;
}