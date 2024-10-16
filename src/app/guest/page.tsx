"use client"; // Coloque isto no topo do arquivo para indicar que é um componente do cliente

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Use 'next/navigation' se estiver na pasta app

const AuthPage = () => { 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>(""); // Novo estado para o primeiro nome
  const [lastName, setLastName] = useState<string>(""); // Novo estado para o sobrenome
  const [username, setUsernameName] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      const res = await signIn("credentials", {
        redirect: true,
        email,
        password,
      });

      console.log(res)

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/"); // Redireciona após login bem-sucedido
      }
    } else {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, fname: firstName, lname: lastName, username }), // Incluindo os novos campos
        });

        if (response.ok) {
          const res = await signIn("credentials", { redirect: false, email, password });
          if (!res?.error) {
            router.push("/"); // Redireciona após registro
          } else {
            setError(res.error);
          }
        } else {
          const data = await response.json();
          setError(data.message || "Failed to register");
        }
      } catch (error) {
        setError("Registration failed.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center content-center h-screen gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col w-80 gap-2">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!isLogin && ( 
          <>
          <div>
          <input
            id="username"
            type="text"
            className="p-2 rounded-lg w-full"
            value={username}
            placeholder="@Username"
            onChange={(e) => setUsernameName(e.target.value)}
            required />
          </div>
            <div className="flex flex-row gap-2 text-black">
              <input
                id="firstName"
                type="text"
                className="p-2 rounded-lg w-full"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required />

              <input
                id="lastName"
                className="p-2 rounded-lg w-full"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required />
            </div></>
        )}

        <input
          id="email"
          type="email"
          placeholder="Email"
          className="p-2 rounded-lg "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          id="password"
          type="password"
          placeholder="Password"
          className="p-2 rounded-lg text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={`mt-2 p-2 rounded-lg ${isLogin ? "bg-green-500 hover:bg-green-600" : "bg-purple-500 hover:bg-purple-600"}`}>
          {isLogin ? "Login" : "Register"}
        </button>

        <p style={{ marginTop: "10px", cursor: "pointer" }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
