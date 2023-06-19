import { AuthContext } from "@/contexts/AuthContext";
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
