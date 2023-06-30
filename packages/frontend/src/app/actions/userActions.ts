export default {
  login: async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3333/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.statusCode && data.statusCode !== 200) {
        return { error: data.message };
      }

      return data.access_token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getByEmail: async (email: string, token: string) => {
    try {
      const res = await fetch(`http://localhost:3333/api/user?email=${email}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return await res.json();
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
