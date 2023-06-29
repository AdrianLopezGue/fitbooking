import React, { ReactNode, createContext, useState, useEffect } from 'react';

type AthleteDTO = {
  _id: string;
  role: string;
};

export const AthleteContext = createContext<{
  athlete: AthleteDTO;
  setAthlete: React.Dispatch<React.SetStateAction<AthleteDTO>>;
}>({
  athlete: { _id: '', role: '' },
  setAthlete: () => undefined,
});

const AthleteProvider = ({ children }: { children: ReactNode }) => {
  const [athlete, setAthlete] = useState<AthleteDTO>(() => {
    const storedAthlete = localStorage.getItem('athlete');
    return storedAthlete ? JSON.parse(storedAthlete) : { _id: '', role: '' };
  });

  useEffect(() => {
    localStorage.setItem('athlete', JSON.stringify(athlete));
  }, [athlete]);

  return (
    <AthleteContext.Provider
      value={{
        athlete,
        setAthlete,
      }}
    >
      {children}
    </AthleteContext.Provider>
  );
};

export { AthleteProvider };
