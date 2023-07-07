const bookSeat = async (sessionId: string, athleteId: string, token: string) => {
  try {
    const res = await fetch(`http://localhost:3333/api/sessions/book/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ athleteId }),
    });
    const data = await res.json();

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
    const res = await fetch(`http://localhost:3333/api/sessions/cancel/${sessionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ athleteId }),
    });
    const data = await res.json();

    if (data.statusCode && data.statusCode !== 200) {
      return { error: data.message };
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const sessionActions = {
  bookSeat,
  cancelSeat,
};
