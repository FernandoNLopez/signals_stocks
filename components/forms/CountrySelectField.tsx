/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
// Client component: uses state, controlled inputs and form integration

import { useState } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import countryList from 'react-select-country-list';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

/**
 * Props for the form-controlled country select field
 * Designed to integrate with react-hook-form
 */
type CountrySelectProps = {
    name: string;
    label: string;
    control: Control<any>;
    error?: FieldError;
    required?: boolean;
};

/**
 * CountrySelect
 * --------------
 * Presentational component responsible for rendering the searchable country dropdown with flags.
 * Controlled externally via value/onChange.
 */
const CountrySelect = ({
                           value,
                           onChange,
                       }: {
    value: string;
    onChange: (value: string) => void;
}) => {
    //Controls the open/close state of the popover dropdown
    const [open, setOpen] = useState(false);

    // Get country options with flags | Country options list (ISO codes + labels)
    const countries = countryList().getData();

    // Helper function to get flag emoji --> Converts an ISO country code into a flag emoji --> Example: "US" → 🇺🇸
    const getFlagEmoji = (countryCode: string) => {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map((char) => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    return (
        /* Trigger button acting as a combobox */
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant='outline'
                    role='combobox'
                    aria-expanded={open}
                    className='country-select-trigger'
                >
                    {value ? (
                        <span className='flex items-center gap-2'>
              <span>{getFlagEmoji(value)}</span>
              <span>{countries.find((c) => c.value === value)?.label}</span>
            </span>
                    ) : (
                        'Select your country...'
                    )}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            {/* Dropdown content */}
            <PopoverContent
                className='w-full p-0 bg-gray-800 border-gray-600'
                align='start'
            >
                <Command className='bg-gray-800 border-gray-600'>
                    {/* Search input for filtering countries */}
                    <CommandInput
                        placeholder='Search countries...'
                        className='country-select-input'
                    />
                    <CommandEmpty className='country-select-empty'>
                        No country found.
                    </CommandEmpty>
                    {/* Scrollable list of country options */}
                    <CommandList className='max-h-60 bg-gray-800 scrollbar-hide-default'>
                        <CommandGroup className='bg-gray-800'>
                            {countries.map((country) => (
                                <CommandItem
                                    key={country.value}
                                    value={`${country.label} ${country.value}`}
                                    onSelect={() => {
                                        onChange(country.value);
                                        setOpen(false);
                                    }}
                                    className='country-select-item'
                                >
                                    {/* Selection indicator */}
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4 text-yellow-500',
                                            value === country.value ? 'opacity-100' : 'opacity-0'
                                        )}
                                    />
                                    <span className='flex items-center gap-2'>
                    <span>{getFlagEmoji(country.value)}</span>
                    <span>{country.label}</span>
                  </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

/**
 * CountrySelectField
 * -------------------
 * Form-aware wrapper around CountrySelect.
 * Wraps CountrySelect with react-hook-form Controller
 * Handles validation, labels, error messages and helper text.
 */
export const CountrySelectField = ({
                                       name,
                                       label,
                                       control,
                                       error,
                                       required = false,
                                   }: CountrySelectProps) => {
    return (
        <div className='space-y-2 m-8'>
            {/* Field label */}
            <Label htmlFor={name} className='form-label'>
                {label}
            </Label>
            {/* Form controller integration */}
            <Controller
                name={name}
                control={control}
                rules={{
                    required: required ? `Please select ${label.toLowerCase()}` : false,
                }}
                render={({ field }) => (
                    <CountrySelect value={field.value} onChange={field.onChange} />
                )}
            />
            {/* Validation error message */}
            {error && <p className='text-sm text-red-500'>{error.message}</p>}
            {/* Helper text */}
            <p className='text-xs text-gray-500'>
                Helps us show market data and news relevant to you.
            </p>
        </div>
    );
};