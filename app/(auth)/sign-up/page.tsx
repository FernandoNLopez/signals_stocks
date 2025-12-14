'use client';

import React from 'react';
import {useForm} from "react-hook-form";

import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";

import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";







const SignUp = () => {

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

    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <>
            <div className="m-5">
                <h1 className="form-title">Sign Up & Personalize</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
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
                        placeholder="contact@jsmastery.com"
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

                    <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                        {isSubmitting ? 'Creating account' : 'Start your investing journey'}
                    </Button>

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