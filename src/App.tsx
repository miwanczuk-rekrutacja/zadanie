import React from "react";
import { PersonsList } from "./components/PersonsList/PersonsList";

export const App: React.FC = () => {
  return (
    <div className={'App'}>
      <PersonsList />
    </div>
  );
}
