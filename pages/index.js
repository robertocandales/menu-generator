import Head from 'next/head';
import Container from '../src/components/Contaniner/Container';
import Category from '../src/components/Category/Category';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Smartavola</title>
      </Head>
      <Container>
        <Category />
      </Container>
    </div>
  );
}
