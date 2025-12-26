'use client';

import {useRouter} from "next/navigation";
import { useForm } from 'react-hook-form';
import {toast} from "sonner";

import {signInWithEmail} from "@/lib/actions/auth.actions";

import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';



const SignIn = () => {

    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    //SignInFormData from ./types/global.d.ts
    const onSubmit = async (data: SignInFormData) => {

        try {
            const result = await signInWithEmail(data);

            if (result.success) router.push('/');

        } catch (error) {
            console.log(error);
            toast.error('Sign in failed!', {
                description: error instanceof Error ? error.message : 'Failed to login.Please check it.',
            });
        }
    }

    return (
        <>
            <div className="m-8">
                <h1 className="form-title">Welcome back</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <InputField
                        name="email"
                        label="Email"
                        placeholder="contact@juanpigarcia.com"
                        register={register}
                        error={errors.email}
                        validation={{ required: 'Email is required', pattern: /^\w+@\w+\.\w+$/ }}
                    />

                    <InputField
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        register={register}
                        error={errors.password}
                        validation={{ required: 'Password is required', minLength: 8 }}
                    />

                    <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                        {isSubmitting ? 'Signing In' : 'Sign In'}
                    </Button>

                    <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
                </form>
            </div>

        </>
    );
};
export default SignIn;