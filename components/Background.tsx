interface BackgroundProps {
    bg?: string;
    children: any;
}

function bgToClass(bg?: string): string {
    if (bg === 'blue') {
        return "bg-blue-500 text-slate-100";
    }
    if (bg === 'pink') {
        return "bg-pink-500 text-slate-100";
    }
    return "bg-gradient-to-br from-blue-200 to-pink-200 text-slate-800"
}

export default function Background(props: BackgroundProps) {
    return <div className={`w-screen h-screen ${bgToClass(props.bg)}`}>
        {props.children}
    </div>;
}
