import { useState, ChangeEvent } from "react";

type CheckboxState<T extends string> = Record<T, boolean>;

// Convert useCheckboxChange to an arrow function
 const useCheckboxChange = <T extends string>(checkboxes: T[]) => {
    const initialState: CheckboxState<T> = checkboxes.reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {} as CheckboxState<T>
    );

    const [checkedItems, setCheckedItems] = useState(initialState);

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        if (!(name in checkedItems)) return; // Ensure name exists in checkboxes

        setCheckedItems((prev) => ({
            ...prev,
            [name as T]: checked,
        }));
    };

    return { checkedItems, handleCheckboxChange };
};

export default useCheckboxChange;
