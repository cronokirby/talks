import { useSectionContext } from "./contexts/section";
import { useTalkContext } from "./contexts/talk"

export default function Header(props: {}) {
    const ctx = useTalkContext();
    const section = useSectionContext();
    return <div className="text-xxs flex justify-between">
        <p>
            <span className="font-medium">{section}</span><span> - {ctx.sectionShift + 1} / {ctx.sectionStarts[ctx.sectionPos + 1] - ctx.sectionStarts[ctx.sectionPos]}</span>
        </p>
        <p>
            <span>{ctx.date.getUTCFullYear()}</span>年
            <span>{`${ctx.date.getUTCMonth() + 1}`.padStart(2, '0')}</span>月
            <span>{`${ctx.date.getUTCDate() + 1}`.padStart(2, '0')}</span>日
        </p>
    </div>;
}