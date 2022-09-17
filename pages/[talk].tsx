import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import path from 'path';

import Section from '../components/Section';
import TextSlide from '../components/TextSlide';
import Talk from '../components/Talk';


function Ul(props: any) {
    return <ul className="text-left list-disc" {...props}>{props.children}</ul>
}

const components = {
    ul: Ul,
    Talk,
    Section,
    TextSlide,
};

export default function Post({ source }: any) {
    return (
        <MDXRemote {...source} components={components} />
    );
}

export async function getStaticProps({ params }: any) {
    const source = await fs.readFile(path.join(process.cwd(), `talks/${params.talk}.mdx`));
    const mdxSource = await serialize(source.toString());
    return { props: { source: mdxSource } };
}

export async function getStaticPaths() {
    const talks = await fs.readdir(path.join(process.cwd(), 'talks'));
    return { paths: talks.map(t => ({ params: { talk: path.parse(t).name } })), fallback: false }
}
