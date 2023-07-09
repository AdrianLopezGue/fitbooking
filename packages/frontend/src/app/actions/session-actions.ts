import { enviroment } from '../../enviroment';

const bookSeat = async (sessionId: string, athleteId: string, token: string) => {
  try {
    const result = await fetch(`${enviroment.API_URL}/sessions/book/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ athleteId }),
    });
    const data = await result.json();

    if (data.statusCode && data.statusCode !== 200) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const cancelSeat = async (sessionId: string, athleteId: string, token: string) => {
  try {
    const result = await fetch(`${enviroment.API_URL}/sessions/cancel/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ athleteId }),
    });
    const data = await result.json();

    if (data.statusCode && data.statusCode !== 200) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findSessionsByDateAndBox = async (date: string, boxId: string, token: string) => {
  try {
    const result = await fetch(
      `${enviroment.API_URL}/sessions?date=${date}&boxId=${boxId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sessionActions = {
  bookSeat,
  cancelSeat,
  findSessionsByDateAndBox,
};
