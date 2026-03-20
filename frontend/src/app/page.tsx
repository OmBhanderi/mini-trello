"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src//components/ui/input";
import { Label } from "@/src//components/ui/label";
import { Card, CardContent } from "@/src/components/ui/card";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../services/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";


const schema = z.object({
  email: z.string(),
  password: z.string().min(6),
});

export type logInSchema = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<logInSchema>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({mutationFn:loginApi,})
  const [error,setError] = useState("");
  const router = useRouter()

  const onSubmit = (data: logInSchema) => {
    mutation.mutate(data,{
      onSuccess: ()=>{
        setError("");
        router.push("/dashboard")
      },
      onError : (err) =>{
        setError(err.message)
      }
    })
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="max-w-md w-full ">
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-semibold">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label>Email</Label>
              <Input {...register("email")} />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <Input type="password" {...register("password")} />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              {mutation.isPending ? "Logging in..." : "Login"}
            </Button>
            {mutation.isError? <p>{error}</p> : " "}
          </form>

          <p className="text-sm text-center">
            Don&apos;t have an account?
            <Link href="/signup" className="text-blue-600 cursor-pointer">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
