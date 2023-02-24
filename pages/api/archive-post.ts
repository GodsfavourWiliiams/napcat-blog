import { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../sanity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    await sanityClient.patch(id as string).set({ isArchived: true });
    res.status(200).json({ message: 'Post archived successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error archiving post' });
  }
}
