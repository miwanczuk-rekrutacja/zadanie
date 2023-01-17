import { useCallback, useEffect, useState } from "react";
import apiData from "src/api/api"

export type Person = {
    id: string;
    jobTitle: string;
    emailAddress: string;
    firstNameLastName: string;
}

export const usePersons = () => {
    const [persons, setPersons] = useState<Person[]>();
    const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [isFetchError, setIsFetchError] = useState<boolean>(false);
    
    const getPersons = useCallback(async () => {
        setIsFetching(true);
        setIsFetchError(false);
        try {
            const response = await apiData();
            setPersons(response);
        } catch (err) {
            setIsFetchError(true);
        } 
        setIsFetching((false));
    }, []);

    const getMorePersons = useCallback(async () => {
        setIsFetching(true);
        setIsFetchError(false);
        try {
            const response = await apiData();
            const currentState = persons || [];
            setPersons([...currentState, ...response]);
        } catch (err) {
            setIsFetchError(true);
        }
        setIsFetching((false));
    }, [persons]);

    const handleSelect = (selectedPerson: Person) => {
        const selectPerson = () => {
            setPersons(persons?.filter(person => person.id !== selectedPerson.id));
            setSelectedPersons([...selectedPersons, selectedPerson]) 
        }

        const unselectPerson = () => {
            setSelectedPersons(selectedPersons.filter(person => person.id !== selectedPerson.id))
            setPersons(persons === undefined ? undefined : [selectedPerson, ...persons]);
        }

        const isAlreadySelected = selectedPersons.some(person => person.id === selectedPerson.id);
        isAlreadySelected ? unselectPerson(): selectPerson();
    }

    const data = persons === undefined ? undefined : [...selectedPersons, ...persons];

    useEffect(() => {
        getPersons();
    }, [getPersons])

    return {
        persons: data,
        isFetching,
        isFetchError,
        selectedPersons,
        getPersons,
        getMorePersons,
        handleSelect,
    }
}