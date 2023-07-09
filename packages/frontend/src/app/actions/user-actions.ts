const login = async (email: string, password: string) => {
  try {
    const result = await fetch('http://localhost:3333/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await result.json();

    if (data.statusCode && data.statusCode !== 200) {
      return { error: data.message };
    }

    return data.access_token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getByEmail = async (email: string, token: string) => {
  try {
    const result = await fetch(`http://localhost:3333/api/user?email=${email}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await result.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const register = async (name: string, email: string, password: string) => {
  try {
    const result = await fetch('http://localhost:3333/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await result.json();

    if (data.status !== 201) {
      throw new Error("Error creating new user");
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const userActions = {
  login,
  getByEmail,
  register,
};
