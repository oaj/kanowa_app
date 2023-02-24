import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check for secret to confirm this is a valid request
    console.log('req.query.secret', req.query.secret)
    if (req.query.secret !== process.env.NEXT_PUBLIC_MY_SECRET_REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const url: string = req.query.url as string
    console.log('req.query.url', req.query.url)
    try {
        // This should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate(url, {
            unstable_onlyGenerated: true
        });

        return res.status(200).json({ revalidated: true });
    } catch (err) {
        console.log('err', err)
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating');
    }
}
