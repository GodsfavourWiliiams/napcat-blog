import { Post } from '../typings';
import { urlFor } from '../lib/sanity';
import Header from '../component/header';

interface Props {
  posts: Post[];
}

export default function Archive({ posts }: Props) {
  return (
    <div>
      <Header/>
      <h1>Archived Posts</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-6 mx-auto max-w-[1300px]">
       
      </div>
    </div>
  );
}
