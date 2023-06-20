import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { FormEvent, useContext, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password
    };

    signIn(data);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if(cookies['nextauth.token']) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      }
    };
  }

  return {
    props: {}
  };
}