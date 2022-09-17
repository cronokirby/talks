import Image from 'next/image';
import ck from '../public/ck.png';
import Background from './Background';

interface TitleProps {
    title: string,
    author: string,
    social: string,
    socialLink: string,
    bg?: string;
}

export default function Title(props: TitleProps) {
    return <Background bg={props.bg}>
        <div className="w-10/12 mx-auto gap-y-6 flex flex-col justify-center h-full">
            <h1 className="text-3xl font-serif font-bold underline decoration-single decoration-blue-600">{props.title}</h1>
            <div className="flex flex-row gap-x-12 mx-auto">
                <Image src={ck} alt="cronokirby's profile picture" width={200} height={200} className="rounded-full shadow-lg" />
                <div className="flex flex-col">
                    <span className="font-medium">{props.author}</span>
                    <a href={props.socialLink} className="font-mono underline decoration-single hover:text-blue-700">{props.social}</a>
                </div>
            </div>
        </div>
    </Background>;
}
