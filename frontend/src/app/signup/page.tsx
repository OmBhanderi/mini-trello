"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Card, CardContent } from "@/src/components/ui/card";
import Link from "next/link"

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Signup Data:", data);

  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input {...register("name")} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input {...register("email")} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div >

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="text-sm text-center">
            Already have an account?
            <Link href="/" className="text-blue-600 cursor-pointer">
              Log In
            </Link>
          </p>
      </CardContent>
    </Card>
  );
}