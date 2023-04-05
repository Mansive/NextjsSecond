import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { connectAndQuery } from '../lib/connect'
import Link from 'next/link'

export default function Home({ queryData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>yee haw</p>
        <p>
          <Link href="/posts/first-post">Click here to go to a different page</Link>
        </p>
        <p>{queryData}</p>
      </section>
    </Layout>
  )
}

export async function getServerSideProps() {
  const queryData = await connectAndQuery();

  return {
    props: {
      queryData
    },
  }
}