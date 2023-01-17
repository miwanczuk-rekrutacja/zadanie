import { act, renderHook } from '@testing-library/react-hooks'
import { Person, usePersons } from 'src/hooks/usePersons';

describe('usePersons', () => {
    const persons: Person[] = [
        {
            id: '1',
            jobTitle: 'job title 1',
            emailAddress: 'email1@address.com',
            firstNameLastName: 'John Doe',
        },
        {
            id: '2',
            jobTitle: 'job title 2',
            emailAddress: 'email2@address.com',
            firstNameLastName: 'Harry Kane',
        },
        {
            id: '3',
            jobTitle: 'job title 3',
            emailAddress: 'email3@address.com',
            firstNameLastName: 'Carl Smith',
        },
    ]
    
    it('handleSelect', () => {
        const { result } = renderHook(usePersons);

        act(() => {
            result.current.handleSelect(persons[1]);
        })

        expect(result.current.selectedPersons).toHaveLength(1);
        expect(result.current.selectedPersons[0].id).toBe('2');

        act(() => {
            result.current.handleSelect(persons[1]);
        })

        expect(result.current.selectedPersons).toHaveLength(0);
    })
})