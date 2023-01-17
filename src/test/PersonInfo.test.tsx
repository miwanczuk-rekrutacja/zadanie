import { render, screen } from '@testing-library/react';
import { PersonInfo } from 'src/components/PersonInfo/PersonInfo';
import { Person } from 'src/hooks/usePersons';

describe('PersonInfo', () => {
    const data: Person = {
        id: '1',
        jobTitle: 'job title',
        emailAddress: 'email@address.com',
        firstNameLastName: 'John Doe',
    }

    it('renders component with data', () => {
        render(<PersonInfo data={data} selected={false} onSelect={jest.fn() } />);

        expect(screen.getByText('JD'));
        expect(screen.getByText('John Doe'));
        expect(screen.getByText('job title'));
        expect(screen.getByText('email@address.com'));
    });
})