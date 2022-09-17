import { promises as fs } from 'fs';
import path from 'path';

function MyApp(props: { talks: string[][] }) {
  return <ul className="text-xxs">
    {props.talks.map((talk) => <li> <a href={`/talks/${talk[0]}/${talk[1]}/${talk[2]}`}>{talk[talk.length - 1]}</a></li>)}
  </ul>;
}

export default MyApp;


export async function getStaticProps() {
  const talks: string[][] = [];

  const root = path.join(process.cwd(), 'talks');
  for (const year of await fs.readdir(root)) {
    for (const month of await fs.readdir(path.join(root, year))) {
      for (const leaf of await fs.readdir(path.join(root, year, month))) {
        talks.push([year, month, path.parse(leaf).name]);
      }
    }
  }
  console.log(talks)
  return { props: { talks } }
}