"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

export const Header = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center p-4">
      {user && (
        <h1>
          {user?.fullName}
          {`'s`} Space
        </h1>
      )}
      <Breadcrumbs />
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
