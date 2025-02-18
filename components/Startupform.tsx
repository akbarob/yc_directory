'use client';

import React, { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/Validation';
import { useToast } from '@/hooks/use-toast';
import { createPitch } from '@/lib/action';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const Startupform = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState('');
    const { toast } = useToast();
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        // Create a new FormData instance to avoid mutating the original
        const submitData = new FormData();
        // Append current form values
        submitData.append('title', formData.get('title') as string);
        submitData.append('description', formData.get('description') as string);
        submitData.append('category', formData.get('category') as string);
        submitData.append('link', formData.get('link') as string);
        submitData.append('pitch', pitch);
        try {
            const formValues = {
                title: submitData.get('title') as string,
                description: submitData.get('description') as string,
                category: submitData.get('category') as string,
                link: submitData.get('link') as string,
                pitch,
            };

            await formSchema.parseAsync(formValues);

            const result = await createPitch(prevState, formData, pitch);
            console.log('akbar', formValues);

            if (result.status == 'SUCCESS') {
                toast({
                    title: 'Success',
                    description:
                        'Your startup pitch has been created successfully',
                });

                router.push(`/startup/${result?._id}`);
            }

            return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErorrs = error.flatten().fieldErrors;
                console.log(error, fieldErorrs);

                setErrors(fieldErorrs as unknown as Record<string, string>);

                toast({
                    title: 'Error',
                    description: 'Please check your inputs and try again',
                    variant: 'destructive',
                });

                return {
                    ...prevState,
                    formData: submitData, // Preserve the form data
                    error: 'Validation failed',
                    status: 'ERROR',
                };
            }

            toast({
                title: 'Error',
                description: 'An unexpected error has occurred',
                variant: 'destructive',
            });

            return {
                ...prevState,
                error: 'An unexpected error has occurred',
                status: 'ERROR',
            };
        }
    };
    const [state, dispatch, isPending] = useActionState(handleFormSubmit, {
        error: '',
        status: 'INITIAL',
    });
    console.log('state', state);
    return (
        <form action={dispatch} className='startup-form'>
            <div className='flex flex-col'>
                <label htmlFor='title' className='startup-form_label'>
                    Title
                </label>
                <Input
                    className='startup-form_input'
                    id='title'
                    name='title'
                    required
                    placeholder='Startup title'
                />
                {errors.title && (
                    <p className='startup-form_error'>{errors?.title}</p>
                )}
            </div>{' '}
            <div className='flex flex-col'>
                <label htmlFor='description' className='startup-form_label'>
                    Description
                </label>
                <Textarea
                    className='startup-form_textarea'
                    id='description'
                    name='description'
                    required
                    placeholder='Startup description'
                />
                {errors.description && (
                    <p className='startup-form_error'>{errors?.description}</p>
                )}
            </div>{' '}
            <div className='flex flex-col'>
                <label htmlFor='category' className='startup-form_label'>
                    Category
                </label>
                <input
                    className='startup-form_input'
                    id='category'
                    name='category'
                    required
                    placeholder='Startup category (Tech, Health, Education)'
                />
                {errors.category && (
                    <p className='startup-form_error'>{errors?.category}</p>
                )}
            </div>{' '}
            <div className='flex flex-col'>
                <label htmlFor='link' className='startup-form_label'>
                    Image URL
                </label>
                <Input
                    className='startup-form_input'
                    id='link'
                    name='link'
                    required
                    placeholder='Startup Image URL'
                />
                {errors.link && (
                    <p className='startup-form_error'>{errors?.link}</p>
                )}
            </div>
            <div className='flex flex-col' data-color-mode='light'>
                <label htmlFor='pitch' className='startup-form_label'>
                    Pitch
                </label>
                <MDEditor
                    value={pitch}
                    onChange={(value) => setPitch(value as string)}
                    id='pitch'
                    preview='edit'
                    height={300}
                    style={{ borderRadius: 20, overflow: 'hidden' }}
                    textareaProps={{
                        placeholder:
                            'Briefly describe your idea and what problems it solves',
                    }}
                    previewOptions={{
                        disallowedElements: ['style'],
                    }}
                />
                {errors.pitch && (
                    <p className='startup-form_error'>{errors?.pitch}</p>
                )}
            </div>{' '}
            <Button
                className='startup-form_btn'
                type='submit'
                disabled={isPending}>
                {isPending ? 'Submitting...' : 'Submit your pitch'}
                <Send className='size-6 ml-2' />
            </Button>
        </form>
    );
};

export default Startupform;
