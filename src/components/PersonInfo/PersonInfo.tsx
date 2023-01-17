import React, { memo } from "react";
import { Person } from "src/hooks/usePersons";
import './PersonInfo.css';

interface PersonInfoProps {
  data: Person;
  selected: boolean;
  onSelect: (person: Person) => void;
};

export const PersonInfo: React.FC<PersonInfoProps> = memo(({data, selected, onSelect}) => {
  const { firstNameLastName, jobTitle, emailAddress } = data;
  const wrapperStyles = `container${selected ? ' selected' : ''}`;
  const initials = data.firstNameLastName.split(' ').map(name => name.charAt(0)).join('');

  return (
    <div className={wrapperStyles} onClick={() => onSelect(data)} data-testId={'person-info'}>
      <div className={'mainData'}>
        <div className={'initials'}>
          {initials}
        </div>
        <div>
          <span className={'firstNameLastName'}>
            {firstNameLastName}
          </span>
          <span className={'jobTitle'}>
            {jobTitle}
          </span>
        </div>
      </div>
      <div className={'emailAddress'}>
        {emailAddress}
      </div>
    </div>
  );
});

