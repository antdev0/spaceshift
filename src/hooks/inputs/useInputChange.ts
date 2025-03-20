import { useState, ChangeEvent } from "react";

// Validation functions inside the hook
const validations = {
    email: (value: string) => /\S+@\S+\.\S+/.test(value),
    numbers_only: (value: string) => /^\d+$/.test(value),
    letters_only: (value: string) => /^[a-zA-Z]+$/.test(value),
    letters_and_numbers: (value: string) => /^[a-zA-Z0-9]+$/.test(value),
};

interface ValidationRule {
    required?: boolean;
    validation?: keyof typeof validations;
}

type FieldConfig<T extends string> = Record<T, ValidationRule>;
type InputState<T extends string> = Record<T, { value: string; error: string | null }>;

// Convert useInputChange to an arrow function
 const useInputChange = <T extends string>(fields: FieldConfig<T>) => {
    const initialState: InputState<T> = Object.keys(fields).reduce(
        (acc, key) => ({
            ...acc,
            [key as T]: { value: "", error: null },
        }),
        {} as InputState<T>
    );

    const [inputs, setInputs] = useState(initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (!(name in fields)) return; // Ensure name exists in fields

        const fieldName = name as T; // Explicitly assert name as T
        const field = fields[fieldName];

        let error: string | null = null;

        if (field.required && !value) {
            error = "This field is required";
        } else if (field.validation && validations[field.validation] && !validations[field.validation](value)) {
            error = "Invalid value";
        }

        setInputs((prev) => ({
            ...prev,
            [fieldName]: { value, error },
        }));
    };

    return { inputs, handleChange };
};

export default useInputChange;
