import React from "react";
import { usePersons } from "src/hooks/usePersons";
import { PersonInfo } from "../PersonInfo/PersonInfo";
import { Spinner } from "../Spinner/Spinner";
import './PersonsList.css';

export const PersonsList: React.FC = () => {
    const {getMorePersons, handleSelect, persons, selectedPersons, isFetching, isFetchError} = usePersons();

    const buttonStyles = `button${isFetchError ? ' buttonError' : ''}`;
    const buttonContent = `Load ${isFetchError ? 'again' : 'more'}`;

    return (
        <> 
            {isFetching && <Spinner />}

            <div>
                <div className={'counter'}>
                    Selected contacts: {selectedPersons.length}
                </div>

                {persons?.map((person) => (
                    <PersonInfo 
                        key={person.id} 
                        data={person} 
                        onSelect={handleSelect}
                        selected={selectedPersons.includes(person)} 
                    />
                ))}

                {isFetchError && (
                    <span className={'failureInfo'}>Fetching failed!</span>
                )}

                <button className={buttonStyles} onClick={getMorePersons} disabled={isFetching}>
                    {buttonContent}
                </button>
            </div>
        </>
    )
}