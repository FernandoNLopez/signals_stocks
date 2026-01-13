'use client';


// Next.js navigation
import {useRouter} from "next/navigation";
// Form handling & validation
import { useForm } from 'react-hook-form';
// User feedback / notifications
import {toast} from "sonner";

// Authentication server actions
import {signInWithEmail} from "@/lib/actions/auth.actions";

// Form components
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';


/**
 * SignIn Page
 * -----------
 * Client-side authentication page.
 * Handles user login using email and password and redirects the user on successful authentication.
 */
const SignIn = () => {
    //Next.js router used for post-login navigation
    const router = useRouter();
    /**
     * React Hook Form configuration
     * - Strongly typed with SignInFormData
     * - Validation triggered on blur
     * - Tracks submission state and errors
     */
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
    /**
     * Handles form submission
     * - Calls the authentication server action
     * - Redirects on success
     * - Displays an error toast on failure
     */
    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if(result.success) router.push('/');
        } catch (e) {
            console.error(e);
            toast.error('Sign in failed', {
                description: e instanceof Error ? e.message : 'Failed to sign in.'
            })
        }
    }

    return (
        <>
            <div className="m-5">
                <h1 className="form-title">Welcome back</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <InputField
                        name="email"
                        label="Email"
                        placeholder="contact@FNL.com"
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