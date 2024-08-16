"use client";

import { useStore } from "@/store/store";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { GithubIcon, GoogleIcon } from "hugeicons-react";
import axios from "axios";
import { signIn } from "next-auth/react";

type Input = {
  userName: string;
  userEmail: string;
  userPassword: string;
};

const SignUpComp = () => {
  const isSheetOpen = useStore((state) => state.signUpSheetOpen);
  const handleChange = useStore((state) => state.setSignUpSheetOpen);
  const handleOpenChange = useStore((state) => state.setSignInSheetOpen);

  const handleSecondaryChange = () => {
    handleChange();
    handleOpenChange();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/register", data)
      .then(() => {
        handleChange();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleChange}>
      <SheetContent
        side={"top"}
        className={
          "w-fit sm:w-96 mx-auto absolute top-5 rounded-lg bg-neutral-200 space-y-3 text-sm"
        }
      >
        <SheetHeader className={""}>
          <SheetTitle>Welcome to Air BnB</SheetTitle>
        </SheetHeader>
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create an Account</CardDescription>
          </CardHeader>
          <CardContent>
            <Label htmlFor={"email"}>Email</Label>
            <Input
              id={"email"}
              type={"email"}
              required
              {...register("email")}
            />
          </CardContent>
          <CardContent>
            <Label htmlFor={"name"}> Name </Label>
            <Input id={"name"} type={"text"} required {...register("name")} />
          </CardContent>
          <CardContent>
            <Label htmlFor={"password"}>Password</Label>
            <Input
              id={"password"}
              type={"password"}
              required
              {...register("password")}
            />
          </CardContent>
          <CardContent className={""}>
            <Button
              type={"submit"}
              onClick={handleSubmit(onSubmit)}
              className={"w-full"}
            >
              Register
            </Button>
          </CardContent>
          <CardContent className="flex justify-evenly">
            <Button
              variant={"secondary"}
              className={"flex justify-evenly gap-3"}
              onClick={() => signIn("google")}
            >
              <GoogleIcon className="w-5 h-5" />
              <p>Google</p>
            </Button>
            <Button
              variant={"secondary"}
              className={"flex justify-evenly gap-3"}
              onClick={() => signIn("github")}
            >
              <GithubIcon className={"w-5 h-5"} />
              <p>Github</p>
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 text-sm justify-center">
            <p>Already have an account?</p>
            <span
              onClick={handleSecondaryChange}
              className={"text-black font-bold cursor-pointer"}
            >
              Sign-In
            </span>
          </CardFooter>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default SignUpComp;
