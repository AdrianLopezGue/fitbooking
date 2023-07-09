const findBoxById = async (boxId: string, token: string) => {
  try {
    const result = await fetch(`http://localhost:3333/api/box/${boxId}`, {
      headers: { Authorization: `Bearer ${token}` },
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

const findBoxByEmail = async (email: string, token: string) => {
  try {
    const result = await fetch(`http://localhost:3333/api/box?email=${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const boxActions = {
  findBoxById,
  findBoxByEmail,
};