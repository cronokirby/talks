import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import path from 'path';
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'


import Section from '../components/Section';
import TextSlide from '../components/TextSlide';
import Talk from '../components/Talk';
import Splash from '../components/Splash';
import Img from '../components/Img';
import Reveal from '../components/Reveal';
import React from 'react';


function Ul(props: any) {
    return <ul className="text-left list-disc" {...props}>{props.children}</ul>
}

function H1(props: any) {
    return <h1 className="text-2xl font-semibold mb-4" {...props}>{props.children}</h1>
}

function Annotation(props: any) {
    return <React.Fragment />
}

const components = {
    h1: H1,
    annotation: Annotation,
    ul: Ul,
    Talk,
    Section,
    TextSlide,
    Splash,
    Img,
    Reveal,
};

export default function Post({ source }: any) {
    return (
        <MDXRemote {...source} components={components} />
    );
}

export async function getStaticProps({ params }: any) {
    const source = await fs.readFile(path.join(process.cwd(), `talks/${params.talk}.mdx`));
    const mdxSource = await serialize(source.toString(), {
        mdxOptions: {
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
        }
    });
    return { props: { source: mdxSource } };
}

export async function getStaticPaths() {
    const talks = await fs.readdir(path.join(process.cwd(), 'talks'));
    return { paths: talks.map(t => ({ params: { talk: path.parse(t).name } })), fallback: false }
}
