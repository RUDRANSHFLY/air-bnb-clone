"use client";
import { signIn } from "next-auth/react";
import { useStore } from "@/store/store";
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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignInComp = () => {
  const router = useRouter();
  const isSheetOpen = useStore((state) => state.signInSheetOpen);
  const handleChange = useStore((state) => state.setSignInSheetOpen);
  const handlleCloseChange = useStore((state) => state.setSignUpSheetOpen);

  const handleSecondarChange = () => {
    handleChange();
    handlleCloseChange();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callBack) => {
      handleChange();

      if (callBack?.ok) {
        toast.success("Access Granted");
        router.refresh();
      }

      if (callBack?.error) {
        console.log(callBack?.error);
      }
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
          <SheetTitle>Welcome Back to Air BnB</SheetTitle>
        </SheetHeader>
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>go to Your Account</CardDescription>
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
              Sign-In
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
            <p>Create an account?</p>
            <span
              onClick={handleSecondarChange}
              className={"text-black font-bold cursor-pointer"}
            >
              {" "}
              Sign-Up
            </span>
          </CardFooter>
        </Card>
      </SheetContent>
    </Sheet>
  );
};

export default SignInComp;
