import { promises as fs } from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import path from 'path';
import Layout from '../components/Layout';


function H1(props: any) {
    return <h1 className="text-2xl font-serif font-bold" {...props}>{props.children}</h1>;
}

const components = {
    h1: H1
};

export default function Post({ source }: any) {
    return (
        <Layout>
            <MDXRemote {...source} components={components} />
        </Layout>
    );
}

export async function getStaticProps({ params }: any) {
    const source = await fs.readFile(path.join(process.cwd(), `talks/${params.talk}.mdx`));
    const mdxSource = await serialize(source.toString());
    return { props: { source: mdxSource } };
}

export async function getStaticPaths() {
    const talks = await fs.readdir(path.join(process.cwd(), 'talks'));
    console.log(talks);
    return { paths: talks.map(t => ({ params: { talk: path.parse(t).name } })), fallback: false }
}
