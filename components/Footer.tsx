import { useSectionContext } from "./contexts/section";
import { useTalkContext } from "./contexts/talk"

export default function Header(props: {}) {
    const ctx = useTalkContext();
    const section = useSectionContext();
    return <div className="text-xxs flex justify-between">
        <a href={ctx.socialLink} className="underline decoration-single hover:text-blue-700">{ctx.social}</a>
        <span>{ctx.slidePos + 1} / {ctx.slideCount}</span>
    </div>;
}