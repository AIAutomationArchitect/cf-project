"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, extraStyle }) => {
  const dashboardURL = "/dashboard";

  if (session) {
    return (
      <Link
        href={dashboardURL}
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        Welcome back {session.user.name || "friend"}
      </Link>
    );
  }
  return (
    <button
      className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      onClick={() => {
        signIn(undefined, { callbackUrl: dashboardURL });
      }}
    >
      Get Started
    </button>
  );
};

export default ButtonLogin;
