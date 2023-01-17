import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { PersonsList } from 'src/components/PersonsList/PersonsList';
import { Person, usePersons } from 'src/hooks/usePersons';
import { mocked } from 'ts-jest/utils';

jest.mock('src/hooks/usePersons');

describe('PersonsList', () => {
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

    it('renders list of persons correctly', () => {
        mocked(usePersons).mockReturnValue({
            persons,
            selectedPersons: [],
        } as any);

        render(<PersonsList />);

        screen.getByText('John Doe');
        screen.getByText('Harry Kane')
        screen.getByText('Carl Smith')
    });

    it('calls getMorePersons function while clicking Load more button', async () => {
        const getMorePersonsMock = jest.fn();
        mocked(usePersons).mockReturnValue({
            persons,
            selectedPersons: [],
            getMorePersons: getMorePersonsMock,
        } as any);

        render(<PersonsList />);

        screen.getByText('John Doe');
        await userEvent.click(screen.getByText('Load more'));

        expect(getMorePersonsMock).toHaveBeenCalledTimes(1);
    });

    it('displays spinner and disables button while fetching', () => {
        mocked(usePersons).mockReturnValue({
            selectedPersons: [],
            isFetching: true,
        } as any);

        render(<PersonsList />);

        expect(screen.getByTestId('spinner')).toBeVisible();
        expect(screen.getByRole('button', { name: 'Load more' })).toBeDisabled();
    });

    it('displays error message while fetching failed', () => {
        mocked(usePersons).mockReturnValue({
            selectedPersons: [],
            isFetchError: true,
        } as any);

        render(<PersonsList />);

        screen.getByText('Fetching failed!');
        screen.getByText('Load again')
    });

    it('invokes handleSelect function while clicking od PersonInfo', async () => {
        const handleSelectMock = jest.fn();
        mocked(usePersons).mockReturnValue({
            persons,
            selectedPersons: [],
            handleSelect: handleSelectMock,
        } as any);

        render(<PersonsList />);

        screen.getByText('Selected contacts: 0');
        await userEvent.click(screen.getByText('Harry Kane'));
        expect(handleSelectMock).toHaveBeenCalledWith({
            id: '2',
            jobTitle: 'job title 2',
            emailAddress: 'email2@address.com',
            firstNameLastName: 'Harry Kane',
        });
    });

    it('displays correct number of selected persons', () => {
        mocked(usePersons).mockReturnValue({
            selectedPersons: [{} as Person, {} as Person],
        } as any);

        render(<PersonsList />);

        screen.getByText('Selected contacts: 2');
    })
})