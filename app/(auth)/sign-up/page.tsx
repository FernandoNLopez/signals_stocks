'use client';
// Client page: uses hooks, form state, navigation and server actions

// React & Next.js core
import React from 'react';
import {useRouter} from "next/navigation";
// Form handling & validation
import {useForm} from "react-hook-form";
// User feedback / notifications
import {toast} from "sonner";

// Application constants (business rules / enums)
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
// Authentication server actions
import {signUpWithEmail} from "@/lib/actions/auth.actions";
// UI component
import {Button} from "@/components/ui/button";
// Form components
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

/**
 * SignUp Page
 * -----------
 * Client-side page responsible for user registration.
 * Collects personal and investment preference data and submits it through a server action.
 */
const SignUp = () => {

    //Next.js router used for post-signup redirection
    const router = useRouter();

    /**
     * React Hook Form setup
     * - Strongly typed using SignUpFormData
     * - Validation triggered on blur
     * - Default values aligned with business rules
     */
    const {
        register,
        handleSubmit,
        control,                                        //control of the form
        formState: {  errors, isSubmitting  }           //tracking errors as well the state of the form
    } = useForm<SignUpFormData>({                       //defining the type of the form, New Interface from "./types/global.d.ts
       defaultValues: {
           fullName: '',
           email: '',
           password: '',
           country: 'ES',
           investmentGoals: 'Growth',
           riskTolerance: 'Medium',
           preferredIndustry: 'Technology'
       }, mode: 'onBlur'
    }, );

    /**
     * Form submission handler
     * - Sends form data to the authentication server action
     * - Redirects user on success
     * - Displays feedback on failure
     */
    const onSubmit = async (data: SignUpFormData) => {
        try {
            //SignUp with email server action
            const result = await signUpWithEmail(data);

            if (result.success) router.push('/');

        } catch (error) {
            console.error(error);
            toast.error('Sign up failed',{
                description: error instanceof Error ? error.message : 'Failed to create an account.'
            })
        }
    };


    return (
        <>
            <div className="m-5">
                {/* Page title */}
                <h1 className="form-title">Sign Up & Personalize</h1>
                {/* Registration form */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    {/* Basic account information */}
                    <InputField
                        name="fullName"
                        label="Full Name"
                        placeholder="John Doe"
                        register={register}
                        error={errors.fullName}
                        validation={{ required: 'Full name is required', minLength: 2 }}
                    />

                    <InputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="contact@FNL.com"
                        register={register}
                        error={errors.email}
                        validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
                    />

                    <InputField
                        name="password"
                        label="Password"
                        placeholder="Enter a strong password"
                        type="password"
                        register={register}
                        error={errors.password}
                        validation={{ required: 'Password is required', minLength: 8 }}
                    />

                    {/* User location */}
                    <CountrySelectField
                        name="country"
                        label="Country"
                        control={control}
                        error={errors.country}
                        required
                    />

                    {/*data of each one of the form components it's coming from ./lib/constants.ts*/}
                    <SelectField
                        name="investmentGoals"
                        label="Investment Goals"
                        placeholder="Select your investment goal"
                        options={INVESTMENT_GOALS}
                        control={control}
                        error={errors.investmentGoals}
                        required
                    />

                    <SelectField
                        name="riskTolerance"
                        label="Risk Tolerance"
                        placeholder="Select your Risk Tolerance"
                        options={RISK_TOLERANCE_OPTIONS}
                        control={control}
                        error={errors.riskTolerance}
                        required
                    />

                    <SelectField
                        name="preferredIndustry"
                        label="Preferred Industry"
                        placeholder="Which industry?"
                        options={PREFERRED_INDUSTRIES}
                        control={control}
                        error={errors.preferredIndustry}
                        required
                    />
                    {/* Submit action */}
                    <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                        {isSubmitting ? 'Creating account' : 'Start your investing journey'}
                    </Button>
                    {/* Redirect to sign-in */}
                    <FooterLink
                        text="Already have an account"
                        linkText="Sign in"
                        href="/sign-in"
                    />
                </form>
            </div>
        </>
    );
};

export default SignUp;