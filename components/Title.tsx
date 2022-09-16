import Image from 'next/image';
import ck from '../public/ck.png';

interface TitleProps {
    author: string,
    date: string,
    children: any,
    social: string,
    socialLink: string
}

export default function Title(props: TitleProps) {
    return <div className="w-5/6 mx-auto gap-y-6 flex flex-col justify-center h-full">
        <h1 className="text-3xl font-serif font-bold underline decoration-single decoration-blue-600">{props.children}</h1>
        <div className="flex flex-row gap-x-12 mx-auto">
            <Image src={ck} alt="cronokirby's profile picture" width={200} height={200} className="rounded-full shadow-lg" />
            <div className="flex flex-col">
                <span className="font-medium">{props.author}</span>
                <a href={props.socialLink} className="font-mono underline decoration-single hover:text-blue-700">{props.social}</a>
            </div>
        </div>
    </div>
}
