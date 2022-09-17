
interface ImgProps {
    src: string;
    shadow: boolean;
    width?: number;
    height?: number;
}

export default function Img(props: ImgProps) {
    return <img src={`/images/${props.src}`} className={`mx-auto rounded-sm ${props.shadow ? 'shadow-md' : ''}`} width={props.width} height={props.height} />
}